/*
 * sign 必填
 * data 必填
 * urls 必填
 * 
 */



function prevbn(str) {
	if (str == 'index') {
		$('.prevbn li').each(function () {
			$(this).click(function () {
				$(this).siblings('li').removeClass('one_avt');
				$(this).addClass('one_avt');

			})
		})
	} else {
		$('.prevbn').children('a').each(function () {
			$(this).click(function () {
				$(this).siblings('a').removeClass(str + '_avt');
				$(this).addClass(str + '_avt');
			})
		})
	}

};

function filterHTMLTag(msg) {
	var arrEntities = {
		'lt': '<',
		'gt': '>',
		'nbsp': ' ',
		'amp': '&',
		'quot': '"'
	};
	msg = msg.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
		return arrEntities[t];
	});
	var msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
	msg = msg.replace(/[|]*\n/, '') //去除行尾空格
	msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
	return msg;
}

function trimSpace(array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] == "" || typeof (array[i]) == "undefined") {
			array.splice(i, 1);
			i = i - 1;

		}
	}
	return array;
}

(function ($, win) {
	function Toload(element, options) {
		this.ele = $(element);
		this.options = $.extend({}, this.defaults, options);
		this._int(this.options);
	};
	Toload.defaults = {
		sign: null, //index,cases,news,
		data: {} || null,
		urls: null,
		fn: null
	};
	Toload.prototype = {
		_int: function (options) { //最终调用的函数
			this.sign = options.sign;
			this.urls = options.urls;
			this.data = options.data;
			this.bn = $('.section_bn');
			this.flag = 0; //开关
			if (this.sign == null || this.data == null || this.urls == null) {
				alert('请输入正确的参数');
				return false;
			} else {
				this._successAjax(); //初始化
			}
		},
		_index: function (a) { //首页
			var i = 0
			if (a.status == '200') {
				for (; i < a.data.length; i++) {
					this.ele.append('<div class="left case_con_box"><span class="width left"><img class="img centre" src="' + a.data[
							i].more +
						'" /></span><div class="left ca_con_mod"> <h3 class="width left">' + a.data[i].post_title +
						'</h3> <p class="width left">' + a.data[i].post_excerpt +
						'</p> <b class="left">READ MORE</b> </div> <div class="left ca_con_bn"><p>' + a.data[i].post_hits + '</p><b>' +
						a.data[i].post_share + '</b></div></div>')
				}
				this.ele.children('div').click(function () {
					for (i = 0; i < a.data.length; i++) {
						document.location.href = '' + a.data[i].links;
					}
				});
			} else {
				if (a.errcode == '1101' && a.errcode) {
					alert('已经是最后一条数据')
				}
			}
			if (this.options.fn == null || this.options.fn == undefined) {

			} else {
				this.options.fn();
			}
		},
		/*
		 *	案例板块
		 */
		_case: function (a) {
			var i = 0;
			if (a.status == '200') {
				for (; i < a.data.length; i++) {
					this.ele.append(
						'<div class="left items"><span class="position left width"><img src="' + a.data[
							i].more +
						'" class="img centre"/></span><h3 class="left">' + a.data[i].post_title +
						'</h3><p class="left">' + a.data[i].published_time.substring(0, 7) +
						'</p><div class="case_hx left width position overflow"><b class="width"></b><s class="width"></s></div></div>'
					);
				}
				this.ele.children('.items').click(function () {
					for (i = 0; i < a.data.length; i++) {
						document.location.href = '' + a.data[i].links;
					}
				});

			} else {
				if (a.errcode == '1101' && a.errcode) {
					alert('已经是最后一条数据')
					this.bn.hide();
				}
			}
			if (this.options.fn == null || this.options.fn == undefined) {

			} else {
				this.options.fn();
			}
		},
		/*
		 *	新闻板块
		 */
		_news: function (a) {
			var i = 0;
			if (a.status == '200') {
				for (; i < a.data.length; i++) {
					this.ele.append(
						'<div class="news_con left"><span class="left display position overflow news_img"><img src="' +
						a.data[i].more +
						'" class="img"/></span><span class="left display position overflow news_wz"><h1>' +
						a.data[i].post_title +
						'</h1><p class="s_t"></p><p class="s_c">' + a.data[i].post_title +
						'</p><p class="s_s">' + a.data[i].published_time +
						'</p></span><span class="left display position overflow jt"><img src="/themes/thinkpz/public/img/jt.png" class="jti"/><img src="/themes/thinkpz/public/img/jts.png" class="jts"/></span></div>'
					);
				}
				this.ele.children('.news_con').click(function () {
					for (i = 0; i < a.data.length; i++) {
						document.location.href = '' + a.data[i].links;
					}
				});
			} else {
				if (a.errcode == '1101' && a.errcode) {
					alert('已经是最后一条数据')
					this.bn.hide();
				}
			}
			if (this.options.fn == null || this.options.fn == undefined) {

			} else {
				this.options.fn();
			}
		},
		/*
		 *	业务板块
		 */
		_buss: function (a) {
			var i = 0;
			if (a.status == '200') {
				for (; i < a.data.length; i++) {
					this.ele.append(
						'<div class="serve_box left position"><span class="left width"><img src="' + a.data[
							i].more +
						'" /></span><div class="serve_con width"><span class="left"><h3 class="left">' +
						a.data[i].post_keywords + '</h3></span><p class="left">' + a.data[i].post_excerpt +
						'</p></div></div>');
				}
				this.ele.children('.serve_box').click(function () {
					for (i = 0; i < a.data.length; i++) {
						document.location.href = '' + a.data[i].links;
					}
				});
			} else {
				if (data.errcode == '1101' && data.errcode) {
					alert('已经是最后一条数据')
					this.bn.hide();
				}
			}
		},
		_join: function (a) {
			var _this=this
			console.log(a)
			var i = 0;
			var rz = [],
				gw = [];
			if (a.status == '200') {
				for (; i < a.data.length; i++) {
					this.ele.children('.job_header').after('<div class="job_box overflow"></div>');
					rz[i] = filterHTMLTag(a.data[i].job_duty);
					gw[i] = filterHTMLTag(a.data[i].job_require);
					gw[i] = trimSpace(gw[i].split('。'));
					rz[i]=trimSpace(rz[i].split('。'))
					
				}
				for (i = 0; i < a.data.length; i++) {
					this.ele.children('.job_box').eq(i).append('<p class="left overflow">' + a.data[i].job_name +
						'</p><p class="left overflow">' + a.data[i].work_place + '</p><p class="left overflow">' + a.data[i].recruit_numbers +
						'</p><p class="left overflow">' + a.data[i].salary +
						'<p class="left overflow"><a href="javascritp:;">查看详情</a></p><div class="left job_xx overflow"></div>');
					this.ele.children('.job_box').eq(i).find('.job_xx').append(
						'<div class="left width xx_top"><ul><li><p>职位名称：</p><b>' + a.data[i].job_name +
						'</b></li><li><p>职位部门：</p><b>' + a.data[i].department + '</b></li><li><p>招聘人数：</p><b>' + a.data[i].recruit_numbers +
						'</b></li><li><p>薪资范围：</p><b>' + a.data[i].salary + '</b></li><li><p>工作地点：</p><b>' + a.data[i].work_place +
						'</b></li><li><p>工作年限：</p><b>' + a.data[i].work_experience + '</b></li><li><p>发布日期：</p><b>' + a.data[i].post_time +
						'</b></li><li><p>职位有效期：</p><b>' + a.data[i].expiry_time + '</b></li></ul></div>');
					this.ele.children('.job_box').eq(i).find('.job_xx').append('<div class="width left xx_con"><span class="left overflow"><ul><h3>岗位职责</h3></ul></span><span class="left overflow"><ul><h3>任职要求</h3></ul></span></div>');
					this.ele.children('.job_box').eq(i).find('.job_xx').append(
						'<div class="xx_bn left overflow width"><span class="left overflow"><ul><li>简历投递接收邮箱</li><li>' + a.data[i].resume_email +
						'</li></ul></span><span class="left overflow"><ul><li>招聘咨询专线</li><li>' + a.data[i].guidance_line +
						'</li></ul></span><span class="left overflow"><ul><li>期待您的简历</li><li>品专互动等你来</li></ul></span></div>');
						$.each(rz[i],function(a,b){
							_this.ele.children('.job_box').eq(i).find('.job_xx .xx_con span').eq(0).find('ul').append('<li>'+rz[i][a]+'</li>');
						})
						$.each(gw[i],function(a,b){
							_this.ele.children('.job_box').eq(i).find('.job_xx .xx_con span').eq(1).find('ul').append('<li>'+gw[i][a]+'</li>');
						})
				}


			} else {
				if (data.errcode == '1101' && data.errcode) {
					alert('已经是最后一条数据')
				}
			}
			if (this.options.fn == null || this.options.fn == undefined) {

			} else {
				this.options.fn();
			}
		},
		/*
		 *	工具
		 * 	1.设置ajax全局参数
		 *	2.ajax执行
		 *	3.部分加载
		 */
		_ajaxSet: function () { //全局参数
			var set = {
				type: 'post',
				url: this.urls,
				data: this.data,
				dataType: 'json'
			};
			return set;
		},
		_successAjax: function () { //ajax执行
			var _this = this;
			$.ajax(_this._ajaxSet()).done(function (data) {
				var successData = data;
				successData = JSON.parse(successData);
				var successCfg = {
					index: "_index",
					news: "_news",
					cases: "_case",
					buss: "_buss",
					join: "_join"
				}
				_this[successCfg[_this.sign]](successData);
				_this._moreBn(successData);
			});
		},
		_moreBn: function (data) { //部分加载    
			var total = data.total, //总条数
				page = data.page, //返回当前页数
				num = data.number, //当前页面新闻条数
				_this = this;
			allpage = null; //总页数
			if (total <= num) {
				this.bn.hide();
			} else {
				allpage = total / num;
				if (total % num != 0) {
					allpage = allpage + 1;
				}
				if (page == allpage) {
					this.bn.hide();
				}
				this.bn.click(function () {
					_this._successAjax()
				});

			}
		}
	};
	$.fn.Toload = function (options) {
		var _this = this;
		this.each(function () {
			var es = new Toload(this, options);
			if (options.sign == 'join') {
				//不做任何操作
			} else {
				prevbn(options.sign);
				$('.prevbn').find('a').each(function () {
					$(this).click(function () {
						var cfg = {
							"0": {
								key: 'category',
								value: 2
							},
							"1": {
								key: 'category',
								value: 3
							},
							"2": {
								key: 'year',
								value: 0
							},
							"2016": {
								key: 'year',
								value: 2016
							},
							"2017": {
								key: 'year',
								value: 2017
							},
							"2018": {
								key: 'year',
								value: 2018
							}
						}

						var data = cfg[$(this).attr('value')];
						options.data[data.key] = data.value;
						es.ele.html('');
						es._successAjax();
					})
				});
			}
		});
		return this;
	}

})(jQuery, window);
