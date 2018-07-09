var formInspect = {
	//名字
	username: function(el) {
		var reg = /^[\u4e00-\u9fa5]{1,8}$/;
		if(($(el).val() == '') || (reg.test($(el).val())) == false) {
			return false;
		} else {
			return true;
		}
	},
	//地址
	site: function(el) {
		var reg = /^(?=.*?[\u4E00-\u9FA5])[\dA-Za-z\u4E00-\u9FA5]+$/;
		if(($(el).val() == '') || (reg.test($(el).val())) == false) {
			return false
		} else {
			return true;
		}
	},
	//手机
	phones: function(el) {
		var reg = /^1[34578]\d{9}$/;
		var alts;
		if($(el).val() == '') {
			alts = '手机号不能为空';
			return alts
		} else if(reg.test($(el).val()) == false) {
			alts = '请输入正确的11位手机号码';
			return alts;
		} else if($(el).val().length < 11 || $(el).val().length > 11) {
			alts = '请输入正确的11位手机号码';
			return alts;
		} else {
			return true;
		}
	},
	//用户名
	user: function(el) {
		var reg = /^[a-zA-Z0-9_]{4,12}$/;
		var alts;
		if($(el).val() == '') {
			alts = '用户名不能为空';
			return alts
		} else if($(el).val().length < 4 || $(el).val().length > 12) {
			alts = '用户名的长度为4~12位';
			return alts;
		} else if(reg.test($(el).val()) == false) {
			alts = '用户名是以数字、字母开头';
			return alts
		} else {
			return true;
		}
	},
	//密码
	pwd: function(el) {
		var reg = /^(\w){6,14}$/;
		var alts;
		if($(el).val() == '') {
			alts = '密码不能为空';
			return alts
		} else if($(el).val().length < 4 || $(el).val().length > 16) {
			alts = '密码的长度是4~16位';
			return alts;
		} else if(reg.test($(el).val()) == false) {
			alts = '密码由数字、字母、下划线等字符组成';
			return alts
		} else {
			return true;
		}
	},
	//确认密码
	pwds: function(el, els) {
		var pwd =$(el).val();
		var pwds =$(els).val();
		var alts;
		if(pwds==''){
			return alts='请再次输入密码';
		}else if(pwds!=pwd){
			return alts='请输入正确的密码';
		}else{
			return true;
		}
	}
}