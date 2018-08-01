/*
 * sign 必填
 * data 必填
 * urls 必填
 * 
 */

;(function ($, win) {
    function Toload(element, options) {
        this.ele = $(element);
        this.options = $.extend({}, this.defaults, options);
        this._int(this.options);
    };
    Toload.defaults = {
        sign: null, //index,cases,news,
        data: {} || null,
        urls: null,
		fn:null
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
            console.log(a)
        },
        /*
         *	案例板块
         * 	1.子元素的动态效果
         *	2.事件
         */
        _case: function (a) {
            var i = 0;
			console.log(a)
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
				this.options.fn();
            } else {
                if (a.errcode == '1101' && a.errcode) {
                    alert('已经是最后一条数据')
                    this.bn.hide();
                }
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
				if(this.options.fn==null||this.options.fn==undefined){
					
				}else{
					this.options.fn();
				}
				
            } else {
                if (a.errcode == '1101' && a.errcode) {
                    alert('已经是最后一条数据')
                    this.bn.hide();
                }
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
                    buss: "_buss"
                }
                _this[successCfg[_this.sign]](successData);
                _this._moreBn(successData);
            });
        },
        _moreBn: function (data) { //部分加载    
            var total = data.total, //总条数
                page = data.page, //返回当前页数
                num = data.number,//当前页面新闻条数
				_this=this;
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
//         _prevBn: function () {
//             var _this = this
//             if (this.sign == 'index') {
// 
//             } else {
//                 this.prev.children('a').each(function () {
//                     $(this).click(function () {
//                         $(this).siblings('a').removeClass(_this.sign + '_avt');
//                         $(this).addClass(_this.sign + '_avt');
//                         var cfg = {
//                             "公司新闻": {
//                                 key: 'category',
//                                 value: 2
//                             },
//                             "行业资讯": {
//                                 key: 'category',
//                                 value: 3
//                             },
//                             "2016年": {
//                                 key: 'year',
//                                 value: 2016
//                             },
//                             "2017年": {
//                                 key: 'year',
//                                 value: 2017
//                             },
//                             "2018年": {
//                                 key: 'year',
//                                 value: 2018
//                             }
//                         }
//                         var data = cfg[$(this).html()];
//                         _this.data[data.key] = data.value;
//                         _this.flag = 1;
//                         _this._successAjax();
//                     })
//                 })
//             }
//         },
    };
    $.fn.Toload = function (options) {
        this.each(function () {
			var keys=$(this).data(this,options);
			// console.log(keys)
            var es = new Toload(this, options);
			// options.fn();
			
        });
        return this;
    }

})(jQuery, window);
