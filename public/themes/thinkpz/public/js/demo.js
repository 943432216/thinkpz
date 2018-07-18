(function($) {
	$.toload = function(options, element) {
		this.$el = $(element);
		this._int(options);
	};
	$.toload.defaults = {
		prots: '', //接口
		btn: '', //按钮
		murl: '', //链接主域名   index:首页   cases:案例  news:新闻  buss:业务
		types: ''//传输字段
	};
	$.tolad.prototype = {
		_int: function(options) {
			this.options = $.extend(true, {}, $.tolad.defaults, options);
			this.jsons = 0;
			this.years = 0;
			this.btn = $('.' + this.options.btn);
			this.types = this.options.types;
			this.murl = this.options.murl;
			this.prots = this.options.prots;
			if(this.prots == '' || this.types == '') {
				alert('请填写数据接口或传输字段');
				return false;
			} else {
				if(this.options.btn == '') {
					this._ajaxs();
				} else {
					switch(this.murl) {
						case index:
							this.years = this.btn.find('.one_avt').children('a').html()
							break;
						case cases:
							this.years = this.btn.find('.case_avt').html()
							break;
						case news:
							this.years = this.btn.find('.news_avt').html()
							break;
						case buss:
							this.years = 0
							break;
					}
					if(this.years == '公司新闻' && this.murl == 'news') {
						this.years = 1;
					} else if(this.years == '行业资讯' && this.murl == 'news') {
						this.years = 2;
					} else if(this.years == '全部案例' && this.murl == 'cases') {
						this.years = 0;
					}
					this._ajax();
				}
			}

		},
		_ajax: function() {
			var _this = this;
			$.ajax({
				type: "post",
				url: _this.prots,
				async: true,
				data: {
					_this.types: _this.years
				},
				dataType: 'json',
				success: function(data) {
					_this.jsons = JSON.parse(data);
					switch(_this.murl) {
						case index:
							_this._index(_this.jsons)
							break;
						case cases:
							_this._case(_this.jsons)
							break;
						case news:
							_this._news(_this.jsons)
							break;
					}
				}
			});
		},
		_ajaxs: function() {
			var _this = this;
			$.ajax({
				type: "post",
				url: _this.prots,
				async: true,
				dataType: 'json',
				success: function(data) {
					_this.jsons = JSON.parse(data);
					_this._buss(_this.jsons);
				}
			});
		},
		_case: function(_casedata) {
			console.log(_casedata);
		},
		_news: function(_newsdata) {
			console.log(_newsdata);
		},
		_buss: function(_busdata) {
			console.log(_busdata);
		},
		_index: function(_indexdata) {
			console.log(_indexdata);
		}
	};
	$.fn.toload = function(options) {
		//执行
		console.log(options);
	}

})(jQuery);