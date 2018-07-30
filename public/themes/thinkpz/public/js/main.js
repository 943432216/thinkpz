/*
 * t1  定时器
 * 
 */
var t1;

function searchs(num) {
	//导航-搜索框
	$('.click_one').on({
		click: function() {
			$(this).css('display', 'none');
			$('.search_click').css('display', 'block')
			$('.search_click').stop().animate({
				'width': '70%'
			}, 500, function() {
				$('.search_click span').css('display', 'block');
				$('.nav_ss input').eq(0).focus();
			});
			$('#search').blur(function() {
				if($('#search').val().length > 0) {
					console.log(1)
				} else {
					$('.nav_ss').mouseleave(function() {
						closes()
					})
				}
			})
		}
	});

	moveT(num)
	$('.nav_con li').each(function(a, b) {
		moves(a);
	})
	$('.nav_con').on('mouseleave', function() {
		$('.hx').stop();
		moveT(num)
	})
}

function closes() {
	$('.search_click span').css('display', 'none')
	$('.search_click').stop().animate({
		'width': '0'
	}, 500, 'linear', function() {
		$('.search_click input').val('');
		$('.search_click').css('display', 'none');
		$('.click_one').css('display', 'block');
	});
}

function moveT(i) {
	var x = $('.nav_con li a').eq(i).innerWidth();
	var a = $('.nav_con li a').eq(i).offset().left;
	var b = $('.nav_logo').outerWidth(true);
	var c = $('.nav').offset().left;
	var nx = a - (b + c);
	nx = Math.floor(nx)
	if(i == 5) {
		nx = nx + 2;
	} else if(i == 6) {
		nx = nx + 2;
	} else if(i <= 4) {
		nx = nx + 1;
	}
	$('.hx').css('width', x);
	$('.hx').css('left', nx);
	$('.hx').css('opacity', '1');
	//	console.log(b)

}

function moves(i) {
	var x = $('.nav_con li a').eq(i).innerWidth();
	var a = $('.nav_con li a').eq(i).offset().left;
	var b = $('.nav_logo').outerWidth(true);
	var c = $('.nav').offset().left;
	var nx = a - (b + c);
	nx = Math.floor(nx);

	if(i == 5) {
		nx = nx + 2;
	} else if(i == 6) {
		nx = nx + 2;
	} else if(i <= 4) {
		nx = nx + 1;
	}
	//运动
	$('.nav_con li').eq(i).mouseenter(function() {
		$('.hx').stop().animate({
			left: nx,
			opacity: '0.05',
			width: x,

		}, 500, function() {
			$('.hx').animate({
				opacity: '0.8'
			}, 50)
		})
	});

}

function scrolls(el) {
	var stt = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	var margins = $('.pz_box').offset().left;
	var navh = $('.nav_con').height();
	var widt = $('.pz_box').width();

	if(stt > 0 && stt < Math.round($(el).offset().top)) {
		$('.nav').css('display', 'none');
		$('.pz_cb').css('display', 'none')
	} else if(stt > Math.round($(el).offset().top)) {
		$('.nav').css({
			'display': 'block',
			'background': 'rgba(0,0,0,0.85)',
			'height': '80px',
			'width': '100%',
			'margin-left': '0'
		});
		$('.pz_cb').css('display', 'block')
		$('.nav_con').css('height', '80px');
		$('.nav_con li').css('height', '80px');
		$('.nav_con li a').css({
			'height': '80px',
			'line-height': '80px'
		})
	} else if(stt == 0) {
		$('.pz_cb').css('display', 'none')
		$('.nav').css({
			'display': 'block',
			'background': 'transparent',
			'height': navh,
			'width': widt,
			'margin-left': margins
		});
		$('.nav_con').css('height', navh);
		$('.nav_con li').css('height', navh);
		$('.nav_con li a').css({
			'height': navh,
			'line-height': navh + 'px'
		})

	}

	$(window).scroll(function() {
		stt = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		//		console.log(stt)
		if(stt > 0 && stt < Math.round($(el).offset().top)) {
			$('.nav').css('display', 'none');
			$('.pz_cb').css('display', 'none')
		} else if(stt > Math.round($(el).offset().top)) {
			$('.nav').css({
				'display': 'block',
				'background': 'rgba(0,0,0,0.85)',
				'height': '80px',
				'width': '100%',
				'margin-left': '0'
			});
			$('.pz_cb').css('display', 'block')
			$('.nav_con').css('height', '80px');
			$('.nav_con li').css('height', '80px');
			$('.nav_con li a').css({
				'height': '80px',
				'line-height': '80px'
			})
		} else if(stt == 0) {
			$('.pz_cb').css('display', 'none')
			$('.nav').css({
				'display': 'block',
				'background': 'transparent',
				'height': navh,
				'width': widt,
				'margin-left': margins
			});
			$('.nav_con').css('height', navh);
			$('.nav_con li').css('height', navh);
			$('.nav_con li a').css({
				'height': navh,
				'line-height': navh + 'px'
			})
		}
	})

}
//case
function cases() {
	var jsons = null;
	var arr = [];
	var mun = 6;
	var jot = '<div class="left items"><span class="position left width"><img src="" class="img centre"/></span><h3 class="left"></h3><p class="left"></p><div class="case_hx left width position overflow"><b class="width"></b><s class="width"></s></div></div>';
	var con = $('.case_nav').find('a').html();
	$.ajax({
		type: "get",
		url: "js/case.txt",
		dataType: 'text',
		async: true,
		success: function(data) {
			// jsons = JSON.parse(data);
			$.each(jsons, function(a, b) {
				if(a == '2016') {
					$.each(jsons[2016], function(n, x) {
						jois(1, n, x, jot, '.case_con')
					});
				} else if(a == '2017') {
					$.each(jsons[2017], function(n, x) {
						jois(2, n, x, jot, '.case_con')
					});
				} else if(a == '2018') {
					$.each(jsons[2018], function(n, x) {
						jois(3, n, x, jot, '.case_con')
					});
				} else if(a == '全部案例') {
					$.each(jsons['全部案例'], function(n, x) {
						jois(0, n, x, jot, '.case_con')
					});
				}
			});
		}
	});
}

function jois(nc, n, x, jots, el) {
	$(el).eq(nc).append(jots);
	$(el).eq(nc).find('span img').eq(n).attr('src', x.pic);
	$(el).eq(nc).find('h3').eq(n).html(x.nameID);
	$(el).eq(nc).find('p').eq(n).html(x.timer);
	$(el).eq(nc).children('.items').eq(n).click(function() {
		document.location.href = x.urls;
	})
}

//nwes
function addnews() {
	var jsons = null;
	var newsel = '<div class="news_con left"><span class="left display position overflow news_img"><img src="" class="img"/></span><span class="left display position overflow news_wz"><h1></h1><p class="s_t"></p><p class="s_c"></p><p class="s_s"></p></span><span class="left display position overflow jt"><img src="img/jt.png" class="jti"/><img src="img/jts.png" class="jts"/></span></div>';
	$.ajax({
		type: "get",
		url: "__TMPL__/public/js/news.txt",
		async: true,
		dataType: 'text',
		success: function(data) {
			jsons = JSON.parse(data);
			$.each(jsons, function(a, b) {
				if(a == 'company') {
					$.each(jsons[a], function(n, x) {
						$('.news_box').eq(0).append(newsel);
						$('.news_box').eq(0).find('.news_img img').eq(n).attr('src', x.pic);
						$('.news_box').eq(0).find('.news_wz h1').eq(n).html(x.titleB);
						$('.news_box').eq(0).find('.news_wz .s_t').eq(n).html(x.titles);
						$('.news_box').eq(0).find('.news_wz .s_c').eq(n).html(x.cons);
						$('.news_box').eq(0).find('.news_wz .s_s').eq(n).html(x.timer);
						$('.news_box').eq(0).children('.news_con').eq(n).click(function() {
							document.location.href = x.urls;
						})
					});
				} else if(a == 'trade') {
					$.each(jsons[a], function(n, x) {
						$('.news_box').eq(1).append(newsel);
						$('.news_box').eq(1).find('.news_img img').eq(n).attr('src', x.pic);
						$('.news_box').eq(1).find('.news_wz h1').eq(n).html(x.titleB);
						$('.news_box').eq(1).find('.news_wz .s_t').eq(n).html(x.titles);
						$('.news_box').eq(1).find('.news_wz .s_c').eq(n).html(x.cons);
						$('.news_box').eq(1).find('.news_wz .s_s').eq(n).html(x.timer);
						$('.news_box').eq(1).children('.news_con').eq(n).click(function() {
							document.location.href = x.urls;
						})
					});
				}
			});
			$('.section_bn').click(function() {
				alert('已经是最后一条内容')
			})
		}
	});
}

//移动
function about_move(el, n1, n2, n3, n4) {
	var a = $(el).offset().top;
	if(el == '.cutrue_box') {
		$(window).on('scroll', function() {
			if(a >= $(window).scrollTop() && a < ($(window).scrollTop() + $(window).height())) {
				$('.cutrue_box').children('span').eq(0).stop().animate({
					left: n1
				}, 1000, 'linear');
				$('.cutrue_box').children('span').eq(1).stop().animate({
					right: n2
				}, 1000, 'linear');
				$('.cutrue_box').children('span').eq(2).stop().animate({
					left: n3
				}, 1000, 'linear');
				$('.cutrue_box').children('span').eq(3).stop().animate({
					right: n4
				}, 1000, 'linear');
			}
		})
	} else {
		$(window).on('scroll', function() {
			if(a >= $(window).scrollTop() && a < ($(window).scrollTop() + $(window).height())) {
				$('.cutrues').children('img').stop().animate({
					left: n1
				}, 700);
				$('.cutrues').children('.cut_bg').stop().animate({
					right: n2
				}, 700);
				$('.cutrues').children('p').eq(1).stop().animate({
					right: n3
				}, 1000, 'linear', function() {
					$('.cutrues').children('p').eq(0).stop().animate({
						right: n4
					}, 500, 'linear');
				});

			}
		})
	}
}

function sharp() {
	var jsons = null;
	$.ajax({
		type: "post",
		url: "http://thinkpz.cn/portal/news/getnews",
		data: {
			page: 1,
			category: 3
		},
		dataType: 'json',
		async: true,
		success: function(data) {
			jsons = JSON.parse(data);
			console.log(jsons);
		}
	});
}

//首页加载

function toload() {
	function _ajax() {
		$.ajax({
			type: 'post',
			url: 'http://thinkpz.cn/portal/business/page',
			data: {
				year: years
			},
			dataType: 'json',
			success: function(data) {
				var jsons = JSON.parse(data)
				console.log(jsons)
			}
		})
	}

}
