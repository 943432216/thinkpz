/*
 *  data-required  当私有属性为 true 时  必填
 * 
 *  callback 对象
 *    hint:错误提示提示
 *    sub:提交数据提示
 */




(function ($, win) {
	function rule(ele, opt) {
		this.ele = $(ele)
		this.opt = $.extend({}, this.defaults, opt);
		this.init();
	}
	rule.defaults = {
		btn: null,
		reg: {} || null,
		hint: null,
		sub: null
	}
	rule.prototype = {
		init: function () {
			this.btn = $(this.opt.btn);
			this.reg = this.opt.reg;
			var _this = this,
				flag = false,
				a = null,
				d = null,
				e = null,
				b = [],
				h = [],
				f = {};
			if (this.reg == null || this.reg == {}) {
				alert('请填写配置信息reg')
				return false;
			} else {
				for( a in this.reg){
					h.push(a)
				}
				this.ele.find('input').each(function () {
					if ($(this).attr('data-required') == 'true') {
						$(this).blur(function () {
							e = $(this).attr('id');
							d = _this.files(e, _this.reg[e]);
							if (d[e] == true) {
								flag=true;
								return;
							} else {
								_this.callBack(_this.opt.hint, [e, d[e]]);
							}

						})
						b.push(this); //获取必填选项长度
					}
				})
			}
			this.btn.click(function () {
				if (h.length == b.length) {//判断必填项是否填写
					if(flag==true){
						_this.callBack(_this.opt.sub);
					}else{
						alert('请填写完整信息')
					}
				} else {
					alert('请填写完整信息')
				}

			})
			//执行
		},
		cfg: function () {
			var alts = null;
			var formInspect = {
				//名字
				username: function (el) {
					var reg = /^[\u4e00-\u9fa5]{1,8}$/;
					if (($(el).val() == '') || (reg.test($(el).val())) == false) {
						alts = '请输入正确的姓名格式';
						return alts;
					} else {
						return true;
					}
				},
				//地址
				site: function (el) {
					var reg = /^(?=.*?[\u4E00-\u9FA5])[\dA-Za-z\u4E00-\u9FA5]+$/;
					if (($(el).val() == '') || (reg.test($(el).val())) == false) {
						alts = '请输入正确的地址';
						return alts
					} else {
						return true;
					}
				},
				//手机
				tel: function (el) {
					var reg = /^1[34578]\d{9}$/;
					var ele = $(el);
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
				},
				e_mail:function(el){
					var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
					if($(el).val() == ''){
						alts='邮箱不能为空';
						return alts;
					}else if(reg.test($(el).val()) == false){
						alts='请填写正确的邮箱';
						return alts;
					}else{
						return true
					}
				}
			}
			return formInspect;
		},
		files: function (index, value) {
			var file = this.cfg()
			var _this = this,
				filev = null,
				f = {};
				// console.log(value)
			if (typeof value == 'string') {
				filev = file[index](value);
			} else {
				filev = file[index](value[0], value[1]);
			}
			f[index] = filev;
			return f;

		},
		callBack: function (cbk, value) {
			if (typeof cbk == 'function') {
				if (value == null || value == '') {
					cbk();
				} else {
					cbk(value)
				}
			} else {
				return false
			}
		}
	}
	$.fn.rule = function (opt) {
		this.each(function () {
			var es = new rule(this, opt);
		})
		return this;
	}
})(jQuery, window)
