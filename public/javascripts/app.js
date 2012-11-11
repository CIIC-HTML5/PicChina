var main_generate = {
    init: function() {}
};

$(main_generate.init());

(function(main_generate) {
    
    // 导航的显示与否，true 表示显示，false 表示隐藏
    var navShowFlag = false;

    function initView() {
        AppInit.initEnd();
        // 全屏的宽度与高度
        // 这里用来初始化
        var w = $(document).width();
        var h = $(document).height();
        $('.main').width(w);
        $('.main').height(h);
        $('.list').width(w);
        $('.list').height(h);
        // 初始化分屏效果 ScrollView
        $('.container').width(($('.list').length) * $('.list').width() + $('.main').width());
        // 局部的 ScrollView
        $('.m-ctn li').width($('.m-frm').width());
        $('.m-ctn').width($('.m-ctn li').length * $('.m-frm').width());
        
        // 详细页面锁，锁定详细页，true 表示显示，false 表示隐藏
        var detailLock = true;
        var showAnimationFlag = false;
        var showIndex = 0;
        
        // 用于处理屏幕的 ScrollView 效果的状态对象
        var screenObj = {
            w: w,
            h: h,
            originX: 0,
            baseX: 0,
            startX: 0,
            endX: 0,
            tmpStartX: 0,
            tmpEndX: 0,
            len:$('.list').length + $('.main').length - 1
        };
        
        // ScrollView 对象
        var screenCtn = $('.container');
        change(screenCtn, 0, 0, 0);
        screenCtn.css({
            '-webkit-transition': 'all 0s linear',
            '-moz-transition': 'all 0s linear',
            '-o-transition': 'all 0s linear',
            '-ms-transition': 'all 0s linear'
        });
        // touchstart (mousedown) 事件
        screenCtn.on('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            var eDown = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            
            // 初始化
            screenObj.startX = screenObj.tmpStartX = screenObj.tmpStartX || eDown.pageX;
            screenCtn.css({
                '-webkit-transition': 'all 0s linear',
                '-moz-transition': 'all 0s linear',
                '-o-transition': 'all 0s linear',
                '-ms-transition': 'all 0s linear'
            });
            
            // touchmove (mousemove) 事件
            screenCtn.on('touchmove', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var eMove = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                
                // 修正位置
                screenObj.tmpEndX = eMove.pageX;
                change(screenCtn, screenObj.baseX + screenObj.tmpEndX - screenObj.tmpStartX, 0, 0);
                screenObj.baseX += screenObj.tmpEndX - screenObj.tmpStartX;
                screenObj.tmpStartX = eMove.pageX;
            });
        });
        
        // touchend (mouseup) 事件
        screenCtn.on('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var eUp = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            // 记录结尾的状态
            screenObj.endX = eUp.pageX;
            
            // 如果移动足够的距离
            if (Math.abs(screenObj.endX - screenObj.startX) > 30) {
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
            screenCtn.css({
                '-webkit-transition': 'all .5s linear',
                '-moz-transition': 'all 5s linear',
                '-o-transition': 'all 5s linear',
                '-ms-transition': 'all 5s linear'
            });
            change(screenCtn, screenObj.baseX, 0, 0);
            
            // 摘除 touchmove (mousemove) 事件
            screenCtn.off('touchmove');
            screenObj.startX = screenObj.tmpEndX = screenObj.tmpStartX = 0;
        });
        
        $('.container img').on('touchend', function(e) {
            var eUp = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            // 记录结尾的状态
            screenObj.endX = eUp.pageX;
            if (Math.abs(screenObj.endX - screenObj.startX) < 20) {
                var thisimg = $(this);
                var offset = thisimg.offset();
                var t = offset.top;
                var l = offset.left;
                var width = w / thisimg.width();
                var height = h / thisimg.height();
                var showani = $('#showanimation');
                showani.html('<img src="' + thisimg.attr('src') + '" width="' + thisimg.width() + '" height="' + thisimg.height() + '" />');
                $('#showanimation img').css('opacity', '1');
                showani.css({
                    'top': t + 'px',
                    'left': l + 'px',
                    'width': thisimg.width() + 'px',
                    'height': thisimg.height() + 'px',
                    'opacity': '1',
                    'z-index': '3',
                    '-webkit-transform': 'matrix(' + width + ',0,0,' + height + ',-' + l + ',-' + t + ')'
                });
                showIndex = thisimg.attr('index');
            }
        });
        
        $('#showanimation').off('webkitTransitionEnd');
        $('#showanimation').on('webkitTransitionEnd', function() {
            if (showAnimationFlag) {
                $('#showanimation').css({
                    'opacity': '0',
                    'z-index': '-1'
                });
            } else {
                $('.detail').css({
                    'z-index': '4'
                });
                showDetails(showIndex);
            }
            showAnimationFlag = ! showAnimationFlag;
        });
    }
    
    function generateView(data) {
        $(".container").html('<div class="main"><div class="m-banner"><div class="m-cur"><div class="m-frm"><ul class="m-ctn"></ul></div></div><ul class="m-oth"></ul></div><div class="m-list"><ul class="m-itm"></ul></div></div>');
        var $newlist;
        var $newul;
        $.each(data, function(i, domEle) {
            var entity_title = domEle['title'];
            var entity_picurl = domEle['picurl'];
            if (typeof entity_picurl == 'string') {
                entity_picurl = entity_picurl.replace("/data", "http://images.china.cn");
            }
            // 第一页大图横滚
            if (i < 4) {
                if (i == 0) {
                    var $img = $('<li><img index="' + i + '" src="../images/loading_circle.gif" rlink="' + entity_picurl + '" /></li>');
                    $('.m-ctn').append($img);
                } else {
                    var $img = $('<li><img index="' + i + '" src="../images/loading_circle.gif" rlink="' + entity_picurl + '" /></li>');
                    $('.m-oth').append($img);
                }
            }
            // 第一页列表信息
            if (i >= 4 && i <= 7) {
                var $img = $('<li><img index="' + i + '" src="../images/loading_circle.gif" rlink="' + entity_picurl + '" /></li>');
                $('.m-itm').append($img);
            }
            // 第二页以后
            if (i > 7) {
                if ((i - 8) % 12 == 0) {
                    // 添加一页
                    $newlist = $('<div class="list"></div>');
                    $('.container').append($newlist);
                }
                if ((i - 8) % 4 == 0) {
                    var $newllist = $('<div class="l-list"></div>');
                    $newlist.append($newllist);
                    $newul = $('<ul class="l-itm"></ul> ');
                    $newllist.append($newul);
                }
                var $img = $('<li><img index="' + i + '" src="../images/loading_circle.gif" rlink="' + entity_picurl + '" /></li>');
                $newul.append($img);
            }
        });
        image_loader();
        $('.outercontainer').css({
            'opacity': '1'
        });
        initView();
    }
    main_generate.initView = initView;
    main_generate.generateView = generateView;
})(main_generate);

// 改变位置的效果
function change(ele, x, y, z) {
    ele.css({
        '-ms-transform':'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)',
        '-webkit-transform':'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)',
        '-moz-transform':'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)',
        '-o-transform':'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)'
    });
}

function image_loader() {
    $('.container img').each(function(index, element) {
        var link = $(element).attr('rlink');
        $(element).attr('src', link);
    });
}

function showDetails(index) {
    yxj_detail.setTopTransiton();
    yzh_fetchDATA.getOneNewsList(index, yxj_detail.main);
}

function hideAnimation() {
    $('.detail').css({
        'z-index': '-1'
    });
    $('#showanimation').css({
        'z-index': '3',
        "-webkit-transform": "matrix(1,0,0,1,0,0)"
    });
}

function reFreshMain(theurl) {
    $('.outercontainer').css({
        'opacity': '0'
    });
    $('.outercontainer').on('webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd', function() {
        yzh_fetchDATA.getDATA(theurl, main_generate.generateView, true);
        $('.outercontainer').off('webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd');
    });
}

$(document).ready(function() {
    columns(null, null);
    var XINWEN = "http://www.china.com.cn/photo/zhuanti/7121183.xml"; // 新闻
    var RENWEN = "http://www.china.com.cn/photo/zhuanti/7121184.xml"; // 人文
    var MEITU = "http://www.china.com.cn/photo/zhuanti/7121185.xml"; // 美图
    var QUTU = "http://www.china.com.cn/photo/zhuanti/7121186.xml"; // 趣图
    
    var theurl = "http://www.china.com.cn/photo/zhuanti/7121183.xml";
    yzh_fetchDATA.getDATA(theurl, main_generate.generateView);
});