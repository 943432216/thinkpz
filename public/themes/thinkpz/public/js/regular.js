(function (win) {
	var alts = null,
		nx = null;
	var e = {};
	var formInspect = {
		//名字
		username: function (el) {
			var reg = /^[\u4e00-\u9fa5]{1,8}$/;
			// var ele=$(el)
			if (($(el).val() == '') || (reg.test($(el).val())) == false) {
				alts = '姓名不能为空或请输入正确的姓名格式';
				return alts;
			} else {
				return true;
			}
		},
		//地址
		site: function (el) {
			var reg = /^(?=.*?[\u4E00-\u9FA5])[\dA-Za-z\u4E00-\u9FA5]+$/;
			if (($(''+el).val() == '') || (reg.test($(el).val())) == false) {
				alts = '请输入正确的地址';
				return alts
			} else {
				return true;
			}
		},
		//手机
		tel: function (el) {
			var reg = /^1[34578]\d{9}$/;
			var ele=$(el);
			if ($(el).val() == '') {
				alts = '手机号不能为空';
				return alts
			} else if (reg.test($(el).val()) == false) {
				alts = '请输入正确的11位手机号码';
				return alts;
			} else if ($(el).val().length < 11 || $(el).val().length > 11) {
				alts = '请输入正确的11位手机号码';
				return alts;
			} else {
				return true;
			}
		},
		//用户名
		user: function (el) {
			var reg = /^[a-zA-Z0-9_]{4,12}$/;
			if ($(el).val() == '') {
				alts = '用户名不能为空';
				return alts
			} else if ($(el).val().length < 4 || $(el).val().length > 12) {
				alts = '用户名的长度为4~12位';
				return alts;
			} else if (reg.test($(el).val()) == false) {
				alts = '用户名是以数字、字母组成';
				return alts
			} else {
				return true;
			}
		},
		//密码
		pwd: function (el) {
			var reg = /^(\w){6,14}$/;
			if ($(el).val() == '') {
				alts = '密码不能为空';
				return alts
			} else if ($(el).val().length < 4 || $(el).val().length > 16) {
				alts = '密码的长度是4~16位';
				return alts;
			} else if (reg.test($(el).val()) == false) {
				alts = '密码由数字、字母、下划线等字符组成';
				return alts
			} else {
				return true;
			}
		},
		//确认密码
		pwds: function (el, els) {
			var pwd = $(el).val();
			var pwds = $(els).val();
			if (pwds == '') {
				return alts = '请再次输入密码';
			} else if (pwds != pwd) {
				return alts = '两次密码不一致';
			} else {
				return true;
			}
		},
		codes: function (el) {
			if ($(el).val() == '' || $(el).val() == null) {
				return alts = '验证码不能为空';
			} else {
				return true;
			}
		}
	}

	function regs(index,value,callback) {
		if (typeof value=='string') {
			nx = formInspect[index](value);
			console.log(1)
		} else {
			nx = formInspect[index](value[1], value[0]);
			console.log(2)
		}
		e[index] = nx;
		$.each(e, function (a) {
			if (e[a] == true) {
				//执行回调
			} else {
				console.log($('#' + a))
				var pL = $('#' + a).siblings('p').innerWidth();
				var spanL = $('#' + a).parent('span').css('margin-left');
				var spanT = $('#' + a).parent('span').position().top;
				var spanM = $('#' + a).parent('span').css('margin-top')
				var innH = $('#' + a).parent('span').innerHeight();
				var innw = $('#' + a).innerWidth();
				offsetT = parseFloat(spanT) + parseFloat(innH) + parseFloat(spanM) + 5;
				offsetL = parseFloat(pL) + parseFloat(spanL);
				var hint = '<b class="hint" style="left:' + offsetL + 'px;top:' + offsetT + 'px;width:' + innw + 'px;">' + e[a] +
					'</b>';
				$('.form').append(hint);
				$('#' + a).focus(function(){
					$('.hint').remove();
				})
			}
		})
	}
	win.regs = regs;
})(window);
