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
				a = null,
				c = null,
				d = null,
				e = null,
				b = [],
				h = [],
				f = {};
			if (this.reg == null || this.reg == {}) {
				alert('请填写配置信息reg')
				return false;
			} else {
				for (a in this.reg) {
					h.push(a) //活的参数长度	
				}
				this.ele.find('input').each(function () {
					if ($(this).attr('data-required') == 'true') {
						$(this).blur(function () {
							e = $(this).attr('id');
							if (typeof _this.reg[e] == 'string') {
								d = _this.files(e, _this.reg[e]);
							} else {
								d = _this.files(e, _this.reg[e]);
							}
							f[e] = d;
							if (f[e] == true) {
								//click
								_this.btn.click(function () {
									_this.callBack(_this.opt.sub);
								})
							} else {
								_this.callBack(_this.opt.hint, [e, d]);
							}

						})
						b.push(this); //获取必填选项长度
					}
				})
				console.log(f)
				// return false;
			}
			this.btn.click(function () {
				if (a.length == b.length) {
					alert('数据正在提交');
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
				}
			}
			return formInspect;
		},
		files: function (index, value) {
			var file = this.cfg()
			var filev = null;
			if (typeof value == 'string') {
				filev = file[index](value);
			} else {
				filev = file[index](value[0], value[1]);
			}
			return filev;
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
