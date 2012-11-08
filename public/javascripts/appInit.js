(function(window, $) {
    var AppInit = {
        init: function() {
            // 锁定初始化视图
            $('.logo').on("touchstart touchmove touchend MSPointerDown MSPointerMove MSPointerUp", function(e) {
                e.preventDefault();
                e.stopPropagation();
            });
            $('.logo').on('webkitTransitionEnd', function() {
                $(this).css({'display': 'none'});
            });
        },
        initEnd: function() {
            // 加载结束时触发
            $('.logo').css({'opacity': 0});
        }
    };
    window.AppInit = AppInit;
})(window, jQuery);

$(AppInit.init);