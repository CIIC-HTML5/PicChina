var main_generate = {
    init:function () {
    }
}
$(main_generate.init());
(function (main_generate) {
    //导航锁，true 表示可以显示，false 表示不可以
//    var navLock = false;
    // 导航的显示与否，true 表示显示，false 表示隐藏
    var navShowFlag = false;

//    function showNav(flag) { // 只是简单点击
//        if (flag != undefined) {
//            navShowFlag = flag;
//        }
//
////        if (navLock) {
//        change($('.hd'), 0, navShowFlag ? 0 : -100, 0);
//        change($('.ft'), 0, navShowFlag ? 0 : 100, 0);
//        navShowFlag = !navShowFlag;
////        }
//    }

    function initView() {
//        image_loader();
        // 全屏的宽度与高度
        // 这里用来初始化
        var w = $(document).width();
        var h = $(document).height();
        $('.main').width(w);
        $('.list').width(w);
        // 初始化分屏效果 ScrollView
        $('.container').width(($('.list').length) * $('.list').width() + $('.main').width());
        // 局部的 ScrollView
        $('.m-ctn li').width($('.m-frm').width());
        $('.m-ctn').width($('.m-ctn li').length * $('.m-frm').width());


        // 详细页面锁，锁定详细页，true 表示显示，false 表示隐藏
        var detailLock = true;

        // 用于处理屏幕的 ScrollView 效果的状态对象
        var screenObj = {
            w:w,
            h:h,
            originX:0,
            baseX:0,
            startX:0,
            endX:0,
            tmpStartX:0,
            tmpEndX:0,
            len:$('.list').length + $('.main').length - 1
        };

        // ScrollView 对象
        var screenCtn = $('.container');

        // mousedown 事件，按下后绑定移动事件，尝试对应 touchstart
        screenCtn.on('touchstart', function (e) {
            var eDown = e.touches[0] || e.changedTouches[0];

            // 初始化
            screenObj.startX = screenObj.tmpStartX = screenObj.tmpStartX || eDown.pageX;

            screenCtn.on('touchmove', function (e) {

                var eMove = e.touches[0] || e.changedTouches[0];
                // 修正位置
                screenObj.tmpEndX = eMove.pageX;
                change(screenCtn, screenObj.baseX + screenObj.tmpEndX - screenObj.tmpStartX, 0, 0);
                screenObj.baseX += screenObj.tmpEndX - screenObj.tmpStartX;
                screenObj.tmpStartX = eMove.pageX;
            });
        });

        // mouseup 事件，抬起后取消移动事件，尝试对应 touchend
        screenCtn.on('touchend', function (e) {

            var eUp = e.touches[0] || e.changedTouches[0];
            // 记录结尾的状态
            screenObj.endX = eUp.pageX;

            // 如果移动足够的距离
            if (Math.abs(screenObj.endX - screenObj.startX) > 10) {
                screenObj.originX += (screenObj.endX - screenObj.startX) * screenObj.w / Math.abs(screenObj.endX - screenObj.startX);
                screenObj.originX = screenObj.originX > 0 ? 0 : screenObj.originX;
                screenObj.originX = screenObj.originX < screenObj.len * -screenObj.w ? screenObj.len * -screenObj.w : screenObj.originX;
                screenObj.baseX = screenObj.originX;
            } else {
                screenObj.baseX = screenObj.originX;


            }
            // 右边超出了
            if (screenObj.baseX < screenObj.len * -screenObj.w) {
                screenObj.baseX = screenObj.len * -screenObj.w;
            }
            // 左边超出了
            if (screenObj.baseX > 0) {
                screenObj.baseX = 0;
            }

            // 显示动画效果
            screenCtn.css({'-webkit-transition':'all .5s linear',
                '-moz-transition':'all 5s linear',
                '-o-transition':'all 5s linear',
                '-ms-transition':'all 5s linear'});
            screenCtn.on('webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd', function () {
                screenCtn.css({'-webkit-transition':'all 0s linear',
                    '-moz-transition':'all 0s linear',
                    '-o-transition':'all 0s linear',
                    '-ms-transition':'all 0s linear'});
                screenCtn.off('webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd');
            });
            change(screenCtn, screenObj.baseX, 0, 0);

            // 摘除时间
            screenCtn.off('touchmove');
            screenObj.startX = screenObj.tmpEndX = screenObj.tmpStartX = 0;
        });

        var slideObj = {
            w:$('.m-frm').width(),
            h:$('.m-frm').height(),
            originX:0,
            baseX:0,
            startX:0,
            endX:0,
            tmpStartX:0,
            tmpEndX:0,
            len:$('.m-ctn li').length - 1
        };

        var slideCtn = $('.m-ctn');

        slideCtn.on('touchstart', function (e) {
            var eDown = e.touches[0] || e.changedTouches[0];

            eDown.stopPropagation();
            slideObj.startX = slideObj.tmpStartX = slideObj.tmpStartX || eDown.pageX;
            screenCtn.on('touchmove', function (e) {

                var eMove = e.touches[0] || e.changedTouches[0];
                slideObj.tmpEndX = eMove.pageX;
                change(slideCtn, slideObj.baseX + slideObj.tmpEndX - slideObj.tmpStartX, 0, 0);
                slideObj.baseX += slideObj.tmpEndX - slideObj.tmpStartX;
                slideObj.tmpStartX = eMove.pageX;
            });
        });

        slideCtn.on('touchend', function (e) {
            var eUp = e.touches[0] || e.changedTouches[0];
            slideObj.endX = eUp.pageX;
            if (Math.abs(slideObj.endX - slideObj.startX) > 10) {
                slideObj.originX += (slideObj.endX - slideObj.startX) * slideObj.w / Math.abs(slideObj.endX - slideObj.startX);
                slideObj.originX = slideObj.originX > 0 ? 0 : slideObj.originX;
                slideObj.originX = slideObj.originX < slideObj.len * -slideObj.w ? slideObj.len * -slideObj.w : slideObj.originX;
                slideObj.baseX = slideObj.originX;
            } else {
                slideObj.baseX = slideObj.originX;
            }
            if (slideObj.baseX < slideObj.len * -slideObj.w) {
                slideObj.baseX = slideObj.len * -slideObj.w;
            }
            if (slideObj.baseX > 0) {
                slideObj.baseX = 0;
            }
            slideCtn.css({
                '-webkit-transition':'all .5s linear',
                '-moz-transition':'all 5s linear',
                '-o-transition':'all 5s linear',
                '-ms-transition':'all 5s linear'
            });
            slideCtn.on('webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd', function () {
                slideCtn.css({
                    '-webkit-transition':'all 0s linear',
                    '-moz-transition':'all 0s linear',
                    '-o-transition':'all 0s linear',
                    '-ms-transition':'all 0s linear'
                });
                slideCtn.off('webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd');
            });
            change(slideCtn, slideObj.baseX, 0, 0);
            slideCtn.off('touchmove');
            slideObj.startX = slideObj.tmpEndX = slideObj.tmpStartX = 0;
        });


//        $('.detail').on('mouseup', function () {
//            //判断点击
//            if (Math.abs(screenObj.endX - screenObj.startX) > 10) {
//
//            } else {
//
//
//                showNav();
//            }
//            ;
//        });
        // 这里开始处理弹出效果
//        $('.detail img').click(function () {
//
////            $('.detail').css({'-webkit-transform':'scale3d(0, 0, 0)'});
//            showNav();
////            navLock = false;
//        });

        $('.hd input').on('touchend',function () {
            $('.detail').css({'-webkit-transform':'scale3d(0, 0, 0)',
                '-moz-transition':'scale3d(0, 0, 0)',
                '-o-transition':'scale3d(0, 0, 0)',
                '-ms-transition':'scale3d(0, 0, 0)'});
//            showNav(false);
//            navLock = false;
        });
        $('.detail').on('webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd', function () {
            if (detailLock) {
            }
            detailLock = !detailLock;
            showDetails();
        });

        $('.container img').on('touchend',function () {
            var offset = $(this).offset();
            var t = offset.top;
            var l = offset.left;
            $('.detail').css({'z-index':'1'});
            $('.detail').css({'top':t + 'px', 'left':l + 'px'});
            $('.detail').css({'-webkit-transform':'translate3d(-' + l + 'px, -' + t + 'px, 0) scale3d(1, 1, 1)',
                '-moz-transition':'translate3d(-' + l + 'px, -' + t + 'px, 0) scale3d(1, 1, 1)',
                '-o-transition':'translate3d(-' + l + 'px, -' + t + 'px, 0) scale3d(1, 1, 1)',
                '-ms-transition':'translate3d(-' + l + 'px, -' + t + 'px, 0) scale3d(1, 1, 1)'});

//            navLock = true;
//            showNav(true);


        });




//        change($('.hd'), 0, navLock ? -100 : 0, 0);
//        change($('.ft'), 0, navLock ? 100 : 0, 0);
    }


    function generateView(data) {

        var $newlist;
        var $newul;
        $.each(data, function (i, domEle) {
                //$("#result2").append("<p>" + domEle['title'] + "</p>");

                var entity_title = domEle['title'];
                var entity_picurl = domEle['picurl'];
                if (typeof entity_picurl == 'string')
                    entity_picurl = entity_picurl.replace("/data", "http://images.china.cn");

//第一页大图横滚
                if (i < 4) {
                    if (i == 0) {
                        var $img = $('<li><img   index=' + i + '  src="../images/loading_circle.gif"  rlink="' + entity_picurl + '" alt="Cur"/></li>');
                        $('.m-ctn').append($img);
                    }
                    else {
                        var $img = $('<li><img   index=' + i + '  src="../images/loading_circle.gif"  rlink="' + entity_picurl + '" alt="Oth"/></li>');
                        $('.m-oth').append($img);
                    }
//                if (i == 0) {
//                    page_top.append("<label class='highlight' ></label>");
//                } else {
//                    page_top.append("<label class='nohighlight' ></label>");
//                }

//                if (i == 3) {
//
//                    $("#overflow_top .inner_top").width($("#overflow_top .inner_top   img").width().valueOf() * $("#overflow_top .inner_top  img").length);
//
//                }

                }
//第一页列表信息
                if (i >= 4 && i <= 7) {

                    var $img = $('<li><img   index=' + i + ' src="../images/loading_circle.gif"  rlink="' + entity_picurl + '"  alt="Oth"/></li>');
                    $('.m-itm').append($img);


                }
//第二页以后
                if (i > 7) {


                    if ((i - 8) % 12 == 0) {
                        //添加一页

//                    curpagenum++;
                        $newlist = $('<div class="list"></div>');
                        $('.container').append($newlist);


                    }
                    if ((i - 8) % 4 == 0) {


                        var $newllist = $('<div class="l-list"></div>');
                        $newlist.append($newllist);
                        $newul = $('<ul class="l-itm"></ul> ');
                        $newllist.append($newul);

                    }
                    var $img = $('<li><img   index=' + i + '  src="../images/loading_circle.gif"  rlink="' + entity_picurl + '" alt="Oth"/></li>');
                    $newul.append($img);

                }


            }

        );
        image_loader();
        initView();
    }

    main_generate.initView = initView;
    main_generate.generateView = generateView;
})(main_generate);

// 改变位置的效果
function change(ele, x, y, z) {
    ele.css({
        '-webkit-transform':'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)',
        '-moz-transition':'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)',
        '-o-transition':'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)',
        '-ms-transition':'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)'
    });
}
;
function image_loader() {
//    $('#show img').live('load', function() {
//        alert("Live handler called.");
//    }).attr('src', '../images/yzh_loading_images.png');

    $('#show img').each(function (index, element) {
        var link = $(element).attr('rlink');
        $(element).attr('src', link);
    });
}
function showDetails(){
    yzh_fetchDATA.getOneNewsList(3,  yxj_detail.main);
}

$(document).ready(function () {

    var XINWEN = "http://www.china.com.cn/photo/zhuanti/7121183.xml"; // 新闻
    var RENWEN = "http://www.china.com.cn/photo/zhuanti/7121184.xml";// 人文
    var MEITU = "http://www.china.com.cn/photo/zhuanti/7121185.xml";// 美图
    var QUTU = "http://www.china.com.cn/photo/zhuanti/7121186.xml";// 趣图


    var theurl = "http://www.china.com.cn/photo/zhuanti/7121183.xml";


    yzh_fetchDATA.getDATA(theurl, main_generate.generateView);


});
