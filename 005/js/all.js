$(document).ready(function () {
    //radom ad event
    var randomAd = ['ad1', 'ad2', 'ad3'];
    var randomAdNum = Math.random();

    randomAdNum = randomAdNum * 3;
    //去除小數位
    randomAdNum = Math.floor(randomAdNum);
    $('#randomAd img').attr('src', 'images/' + randomAd[randomAdNum] + '.jpg');

});

// Hide Header on on scroll down
$(document).ready(function () {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $('header').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }
        }

        lastScrollTop = st;
    };
});

//go Top 
$(document).ready(function () {
    //先藏起來
    $('#backTop').hide();

    //下滑超過50px時出現，反之消失
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 50) {
            $("#backTop").fadeIn(600);
        } else {
            $("#backTop").fadeOut(600);
        }
    });

    //點擊事件
    $('#backTop').on('click', function () {
        $("html,body").animate({ scrollTop: 0 }, 800);
        return false;
    });
});

//side menu
$(document).ready(function () {
    var navDis = 120;
    $('#comicList').on('click', function () {
        $('header').children().animate({ 'margin-right': '+=' + navDis + 'px' }, 200);
        $('body').children().animate({ 'margin-right': '+=' + navDis + 'px' }, 200);

        navDis *= -1;
    });
});