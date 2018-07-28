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
            if (this.sign == null || this.data == null || this.urls == null) {
                alert('请输入正确的参数')
                return false;
            } else {
                this._successAjax(this.sign);
            }
        },
        _index: function (a) { //首页
            // console.log(data)
        },
        _case: function (a) { //案例模块
            // console.log(data)
        },
        _news: function (a) { //新闻模块
            // console.log(data)
        },
        _buss: function (a) { //业务模块
            var i = 0;
            if (a.status == '200') {
                for (; i < a.data.length; i++) {
                    this.ele.append('<div class="serve_box left position"><span class="left width"><img src="' + a.data[i].more + '" /></span><div class="serve_con width"><span class="left"><h3 class="left">' + a.data[i].post_keywords + '</h3></span><p class="left">' + a.data[i].post_excerpt + '</p></div></div>');
                }
				this.ele.children('.serve_box').click(function(){
					for(i=0;i<a.data.length; i++){
						document.location.href='' + a.data[i].links;
					}
				});
				
            } else {
                if (data.errcode == '1101' && data.errcode) {
                    alert('已经是最后一条数据')
                    $('.section_bn').hide();
                }
            }

        },
        _ajaxSet: function () { //统一的ajax参数
            var set = {
                type: 'post',
                url: this.options.urls,
                data: this.options.data,
                dataType: 'json'
            };
            return set;
        },
        _successAjax: function (sign) { //成功执行函数
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
            })

        }
    };
    $.fn.Toload = function (options) {
        this.each(function () {
            var es = new Toload(this, options);
        });
        return this;
    }

})(jQuery, window);
