/*
 * sign 必填
 * data 必填
 * urls 必填
 * 
 */

(function ($, win) {
    function Toload(element, options) {
        this.ele = $(element);
        this.options = $.extend({}, this.defaults, options);
        this._int(this.options);
    };
    Toload.defaults = {
        sign: null,
        data: {} || null,
        urls: null
    };
    Toload.prototype = {
        _int: function (options) { //最终调用的函数
            this.sign = options.sign;
            this.urls = options.urls;
            this.data = options.data;
            this.bn = $('.section_bn');
            // this.setData = null;
            if (this.sign == null || this.data == null || this.urls == null) {
                alert('请输入正确的参数')
                return false;
            } else {
                this._successAjax(this.sign); //初始化
//                 if (this.sign) {
// 
//                 }
            }
        },
        _index: function (a) { //首页
            // console.log(data)
        },
        //案例模块
        _case: function (a) {
            // console.log(data)
        },
        /*
         *	新闻板块
         * 	1.子元素的动态效果
         *	2.事件
         */
        _news: function (a) {
            var i = 0;
            if (a.status == '200') {
                this._moreBn(a);
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
                this._newCon();
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
        },
        //新闻板块动效
        _newCon: function () {
            this.ele.children('.news_con').mouseenter(function () {
                $(this).css('background', '#007ee9')
                $(this).children('.news_wz').addClass('news_avts');
                $(this).find('.jts').stop().animate({
                    left: '25%'
                }, 500)
            }).mouseleave(function () {
                $(this).css('background', '#f7f7f7');
                $(this).children('.news_wz').removeClass('news_avts');
                $(this).find('.jts').stop().animate({
                    left: '-25%'
                }, 500)
            });
        },
        /*
         *	业务板块
         * 	1.模块内子元素的动态效果
         *	2.事件
         */
        _buss: function (a) {
			console.log(a)
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
                this._moreBn(a);
            } else {
                if (data.errcode == '1101' && data.errcode) {
                    alert('已经是最后一条数据')
                    this.bn.hide();
                }
            }

        },
        /*
         *	ajax
         * 	1.设置全局参数
         *	2.ajax执行
		 *	3.部分加载
         */
        _ajaxSet: function () {//全局参数
            var set = {
                type: 'post',
                url: this.options.urls,
                data: this.options.data,
                dataType: 'json'
            };
            return set;
        },
        _successAjax: function (sign) {//ajax执行
            var _this = this;
            $.ajax(this._ajaxSet()).done(function (data) {
                var successData = data;
                successData = JSON.parse(successData);
                switch (sign) {
                    case 'index':
                        _this._index(successData)
                        break;
                    case 'news':
                        _this._news(successData)
                        break;
                    case 'case':
                        _this._case(successData)
                        break;
                    case 'buss':
                        _this._buss(successData)
                        break;
                }
            });
        },        
        _moreBn: function (data) {//部分加载
            console.log(data);
            var total = data.total, //总条数
                page = data.page, //返回当前页数
                num = data.number, //当前页面新闻条数
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
                    this._successAjax(this.sign)
                });

            }
        }
    };
    $.fn.Toload = function (options) {
        this.each(function () {
            var es = new Toload(this, options);
        });
        return this;
    }

})(jQuery, window);
