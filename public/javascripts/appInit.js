(function(window, $) {
    var flag = true;
    var AppInit = {
        init: function() {
            if (! flag) { return; }
            // 锁定初始化视图
            $('.logo').on("touchstart touchmove touchend MSPointerDown MSPointerMove MSPointerUp", function(e) {
                e.preventDefault();
                e.stopPropagation();
            });
            $('.logo').on('webkitTransitionEnd', function() {
                flag = false;
                $(this).css({'display': 'none'});
            });
        },
        initEnd: function() {
            // 加载结束时触发
            if (! flag) { return; }
            $('.logo').css({'opacity': 0});
        }
    };
    window.AppInit = AppInit;
})(window, jQuery);

$(AppInit.init);