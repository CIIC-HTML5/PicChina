/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-10-17
 * Time: 上午10:59
 * To change this template use File | Settings | File Templates.
 */
var yxj_detail = {};
(function (yxj_detail) {
    var title = "";
    var describer = "";
    var currentPage = 1;
    var pageCount = 1;
    var datas = null;
    var touchs = null;
    var flag = 0;

    function setTitle(title) {
        this.title = title;
    }

    function setCurrentPage(currPage) {
        this.currentPage = currPage;
    }

    function setPageCount(pgCount) {
        this.pageCount = pgCount;
    }

    function setDescriber(dscriber) {
        this.describer = dscriber;
    }

    function getCurrentPage() {
        return this.currentPage;
    }

    function getPageCount() {
        return this.pageCount;
    }

    function getDescriber() {
        return this.describer;
    }

    function getTitle() {
        return this.title;
    }

//设置TRANSFORM过度
    function setTransition(dom) {
        $(dom).css({"-webkit-transition":"all .5s ease-out",
            "-moz-transition":"all .5s ease-out",
            "-o-transition":"all .5s ease-out",
            "-ms-transition":"all .5s ease-out",
            "transition":"all .5s ease-out",
            "-webkit-transform-style":"preserve-3d",
            "-moz-transform-style":"preserve-3d",
            "-o-transform-style":"preserve-3d",
            "-ms-transform-style":"preserve-3d",
            "transform-style":"preserve-3d"
        });
    }

//设置TRANSFORM过度
    function clearTransition(dom) {
        $(dom).css({"-webkit-transition":"all 0s ease-out",
            "-moz-transition":"all 0s ease-out",
            "-o-transition":"all 0s ease-out",
            "-ms-transition":"all 0s ease-out",
            "transition":"all 0s ease-out",
            "-webkit-transform-style":"preserve-3d",
            "-moz-transform-style":"preserve-3d",
            "-o-transform-style":"preserve-3d",
            "-ms-transform-style":"preserve-3d",
            "transform-style":"preserve-3d"
        });
    }

//设置透明相应过度
    function setDetailDivTransition(dom) {
        $(dom).css({"-webkit-transition":"opacity .5s ease-out",
            "-moz-transition":"opacity .5s ease-out",
            "-o-transition":"opacity .5s ease-out",
            "-ms-transition":"opacity .5s ease-out",
            "transition":"opacity .5s ease-out",
            "-webkit-transform-style":"preserve-3d",
            "-moz-transform-style":"preserve-3d",
            "-o-transform-style":"preserve-3d",
            "-ms-transform-style":"preserve-3d",
            "transform-style":"preserve-3d"
        });
    }

//设置透明相应过度
    function clearDetailDivTransition(dom) {
        $(dom).css({"-webkit-transition":"opacity 0s ease-out",
            "-moz-transition":"opacity 0s ease-out",
            "-o-transition":"opacity 0s ease-out",
            "-ms-transition":"opacity 0s ease-out",
            "transition":"opacity 0s ease-out",
            "-webkit-transform-style":"preserve-3d",
            "-moz-transform-style":"preserve-3d",
            "-o-transform-style":"preserve-3d",
            "-ms-transform-style":"preserve-3d",
            "transform-style":"preserve-3d"
        });
    }

//设置相应层的过度
    function setTransform(dom, dist) {
        $(dom).css({"-webkit-transform":"translate3d(0px," + dist + "px,0px)",
            "-moz-transform":"translate3d(0x," + dist + "px,0px)",
            "-o-transform":"translate3d(0px," + dist + "px,0px)",
            "-ms-transform":"translate3d(0px," + dist + "px,0px)",
            "transform":"translate3d(0px," + dist + "px,0px)"
        });
    }

//设置相应层的透明度
    function setOpacity(dom, opacity) {
        $(dom).css({"opacity":opacity});
    }

    //异步加载图片
    function loadingImg(dom, url, key) {
        $(dom).load(url, function () {
            $(dom).attr("src", url);
            if (key == 0) {
                $(dom).on(function () {
                    setDetailAnimation();
                });
            }
        });
    }

    //异步加载图片
    function loadingImgs(dom, url, key, data) {
        $(dom).load(url, function () {
            $(dom).attr("src", url);
            if (key == 0) {
                setDetailAnimation();
                $("#yxjup").empty();
                $("#yxjup").text(title + "(" + currentPage + "/" + pageCount + ")");
                $("#yxjdetail").text(value.desc);
                $.each(data.items, function (key, value) {
                    if (key != 0)
                        loadingImg("#yxjbgimg" + key, value.lurl, key);
                });
            }
        });
    }

//设置大图片所依附的父层的总宽度
    function setPicDivWidth(dom, size) {
        pageCount = size;
        $(dom).css("width", $("body").width() * size + "px");
    }

//調用此閉包的函數主入口
    function main(data, titles) {
        datas = data;
        title = titles;
        setPicDivWidth("#yxjpicturediv", data.items.length);
        setAnimate();
        setBack();
        $.each(data.items, function (key, value) {
                var tag = "<div id=\"yxjpicturedivs" + key + "\" style=' background: url(../images/loading_circle.gif) no-repeat center;height:100%;" +
                    "display: -webkit-box;" +
                    "-webkit-box-orient: horizontal;" +
                    "-webkit-box-pack: center;" +
                    "-webkit-box-align: center;" +
                    "display: -moz-box;" +
                    "-moz-box-orient: horizontal;" +
                    "-moz-box-pack: center;" +
                    "-moz-box-align: center;" +
                    "display: -o-box;" +
                    "-o-box-orient: horizontal;" +
                    "-o-box-pack: center;" +
                    "-o-box-align: center;" +
                    "display: -ms-box;" +
                    "-ms-box-orient: horizontal;" +
                    "-ms-box-pack: center;" +
                    "-ms-box-align: center;" +
                    "display: box;" +
                    "box-orient: horizontal;" +
                    "box-pack: center;" +
                    "float:left;width:" + $("body").width() + "px;height:100%;margin-bottom:-120px'>" +
                    "<img id=\"yxjbgimg" + key + "\" src=\"" + value.lurl + "\" style='max-width:" + $("body").width() + "px;" +
                    "max-height:" + $("body").height() + "px" +
                    "' alt=\"正在努力加载，请稍后。。。\">" +
                    "</div>";
                $(tag).appendTo("#yxjpicturediv");
                if (key == 0) {
                    setDetailAnimation();
                    $("#yxjup").empty();
                    $("#yxjup").text(title + "(" + currentPage + "/" + pageCount + ")");
                    $("#yxjdetail").text(value.desc);
                }
//            }
            }

        )
        ;
        analyticData(null, datas.items, "#yxjbottom");
        touchs = new touchClass();
        touchs.touch("#yxjpicturediv", data.items.length, $("body").width(), action);
    }

//设置点击大图时顶部、底部、描述层的过度效果
    function setAnimate() {
        var velocitys = 0;
        setTransition("#yxjtop");
        setTransition("#yxjbottom");
        setDetailDivTransition("#yxjdetail");

        $("#yxjpicturediv").on('touchstart touchmove touchend', function (event) {
            event.preventDefault();
            event.stopPropagation();
            var touch = null;
            if (event.type == 'touchmove') {
                velocitys++;
            }
            if (event.type == 'touchend') {
                if (velocitys < 2) {
                    if (flag == 0) {
                        setTransform("#yxjtop", 0);
                        setTransform("#yxjbottom", 0);
                        setOpacity("#yxjdetail", 0);
                    } else {
                        setTransform("#yxjtop", 100);
                        setTransform("#yxjbottom", -150);
                        $("#yxjdetail").css("z-index", "22");
                        setOpacity("#yxjdetail", 0.5);
                    }
                }
                velocitys = 0;
            }
        });
//设置当过度事件完成时描述层的Z—INDEX
        $("#yxjdetail").off("webkitTransitionEnd");
        $("#yxjdetail").on("webkitTransitionEnd msTransitionEnd oTransitionEnd mozTransitionEnd TransitionEnd", function () {
            if (flag == 0) {
                $("#yxjdetail").css("z-index", "-1");
                flag = 1;
            }
            else {
                flag = 0;
            }
        });
    }

//设置大图翻页小图联动事件
    function action(currentPage) {
        $.each(datas.items, function (key, value) {
            if (key == currentPage - 1) {
                $("#yxjup").text(title + "(" + currentPage + "/" + pageCount + ")");
                $("#yxjdetail").text(value.desc);
                setScrollImgLinkAge(value.id, key);
            }

        });
    }

//设置小图点击大图联动事件
    function setMove(key) {
//        alert(key);
        var move = -(key) * $("body").width();
        touchs.setDist(move);
        touchs.setCurrentPage(key + 1);
        touchs.move("#yxjpicturediv");
        action(key + 1);
    }

//设置返回按钮事件
    function setBack() {
        $(".yxjback").on('touchend MSPointerUp', function () {
            hideAnimation();
            clear();
        });
    }

//设置返回按钮
    function clear() {
        flag = 0;
        $("#yxjpicturediv").empty();
        $("#yxjup").empty();
        $("#yxjdetail").empty();
        $("#yxjbottom").empty();
        $("#yxjpicturediv").empty();
        $("#yxjpicturediv").html("");
        $(".detail").css({"opacity":"0"});
        $("#yxjdetail").css("z-index", "-1");
        setTransform("#yxjtop", 0);
        setTransform("#yxjbottom", 0);
        setOpacity("#yxjdetail", 0);
        $("#yxjpicturedivs img").css("src", "./images/loading_circle.gif");
//            alert($("#yxjpicturediv").html());
        touchs = null;
        currentPage = 1;
        pageCount = 1;
        $("#yxjpicturediv").css({"-webkit-transition":"-webkit-transform 0s ease-out",
            "-moz-transition":"-moz-transform 0s ease-out",
            "-o-transition":"-o-transform 0s ease-out",
            "-ms-transition":"-ms-transform 0s ease-out",
            "transition":"transform 0s ease-out",
            "-webkit-transform-style":"preserve-3d",
            "-moz-transform-style":"preserve-3d",
            "-o-transform-style":"preserve-3d",
            "-ms-transform-style":"preserve-3d",
            "transform-style":"preserve-3d"
        });
        $("#yxjpicturediv").css({"-webkit-transform":"translate3d(" + (0) + "px,0px,0px)",
            "-moz-transform":"translate3d(" + (0) + "px,0px,0px)",
            "-o-transform":"translate3d(" + (0) + "px,0px,0px)",
            "-ms-transform":"translate3d(" + (0) + "px,0px,0px)",
            "transform":"translate3d(" + (0) + "px,0px,0px)"
        });
    }

    function setDetailAnimation() {
//        $(".detail").off("webkitTransitionEnd");
        $(".detail").css({"opacity":"1"});
//        $(".detail").on("webkitTransitionEnd",function(e){

        setTransform("#yxjbottom", -150);
        $("#yxjdetail").css("z-index", "22");
        setOpacity("#yxjdetail", 0.5);
        flag = 1;
//        });
    }

    function setTopTransition() {
        $("#yxjup").html("<img src='./images/loading_circle.gif' width='50px' height='50px'/>");
        setTransition("#yxjtop");
        setTransform("#yxjtop", 100);
        $("#yxjbottom").on("touchmove",function(e){
            e.preventDefault();
            e.stopPropagation();
        })
    }

    yxj_detail.main = main;
    yxj_detail.setAnimate = setAnimate;
    yxj_detail.setMove = setMove;
    yxj_detail.setBack = setBack;
    yxj_detail.clear = clear;
    yxj_detail.setTopTransiton = setTopTransition;
})
    (yxj_detail);
