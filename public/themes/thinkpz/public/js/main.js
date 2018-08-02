/*
 * t1  定时器
 * 
 */
var t1;

function searchs(num) {
    //导航-搜索框
    $('.click_one').on({
        click: function () {
            $(this).css('display', 'none');
            $('.search_click').css('display', 'block')
            $('.search_click').stop().animate({
                'width': '70%'
            }, 500, function () {
                $('.search_click span').css('display', 'block');
                $('.nav_ss input').eq(0).focus();
            });
            $('#search').blur(function () {
                if ($('#search').val().length > 0) {
                    console.log(1)
                } else {
                    $('.nav_ss').mouseleave(function () {
                        closes()
                    })
                }
            })
        }
    });

    moveT(num)
    $('.nav_con li').each(function (a, b) {
        moves(a);
    })
    $('.nav_con').on('mouseleave', function () {
        $('.hx').stop();
        moveT(num)
    })
}

function closes() {
    $('.search_click span').css('display', 'none')
    $('.search_click').stop().animate({
        'width': '0'
    }, 500, 'linear', function () {
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
    if (i == 5) {
        nx = nx + 2;
    } else if (i == 6) {
        nx = nx + 2;
    } else if (i <= 4) {
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

    if (i == 5) {
        nx = nx + 2;
    } else if (i == 6) {
        nx = nx + 2;
    } else if (i <= 4) {
        nx = nx + 1;
    }
    //运动
    $('.nav_con li').eq(i).mouseenter(function () {
        $('.hx').stop().animate({
            left: nx,
            opacity: '0.05',
            width: x,

        }, 500, function () {
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

    if (stt > 0 && stt < Math.round($(el).offset().top)) {
        $('.nav').css('display', 'none');
        $('.pz_cb').css('display', 'none')
    } else if (stt > Math.round($(el).offset().top)) {
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
    } else if (stt == 0) {
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

    $(window).scroll(function () {
        stt = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        //		console.log(stt)
        if (stt > 0 && stt < Math.round($(el).offset().top)) {
            $('.nav').css('display', 'none');
            $('.pz_cb').css('display', 'none')
        } else if (stt > Math.round($(el).offset().top)) {
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
        } else if (stt == 0) {
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
//移动
function about_move(el, n1, n2, n3, n4) {
    var a = $(el).offset().top;
    if (el == '.cutrue_box') {
        $(window).on('scroll', function () {
            if (a >= $(window).scrollTop() && a < ($(window).scrollTop() + $(window).height())) {
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
        $(window).on('scroll', function () {
            if (a >= $(window).scrollTop() && a < ($(window).scrollTop() + $(window).height())) {
                $('.cutrues').children('img').stop().animate({
                    left: n1
                }, 700);
                $('.cutrues').children('.cut_bg').stop().animate({
                    right: n2
                }, 700);
                $('.cutrues').children('p').eq(1).stop().animate({
                    right: n3
                }, 1000, 'linear', function () {
                    $('.cutrues').children('p').eq(0).stop().animate({
                        right: n4
                    }, 500, 'linear');
                });

            }
        })
    }
}

function sharp() {

}
