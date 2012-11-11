/**
 * Created with JetBrains WebStorm.
 * User: yzh
 * Date: 12-9-26
 * Time: 下午3:54
 * To change this template use File | Settings | File Templates.
 */
var yzh_fetchDATA = {
    init: function() {}
};

$(yzh_fetchDATA.init());

(function(yzh_fetchDATA) {
    
    var xmlData;
    
    var loadModul = {
        /**
         * 1 图片自己转
         * 2 图片为gif
         */
        loadingmode: 2,
        imagename: '../images/loading_circle.gif',
        rate: 540,
        loadinginfo: 'loading...',
        root: $('#yzh_forloadingshowdiv'),
        loadingshowimg: $('#yzh_loadingimage'),
        n: 0,
        flag: true,
        init: function() {
            if (! this.root || ! this.root.length) {
                this.root = $('<div id="yzh_forloadingshowdiv" style="display:none; -webkit-transition: opacity 0.8s linear;' +
                    '-moz-transition: opacity 0.8s linear; -o-transition: opacity 0.8s linear; -ms-transition: opacity 0.8s linear; height: 100%;width: 100%;z-index: 999;top:0;left:0; background:rgba(0,0,0,0.9); position:fixed;">' +
                    '<div style="height: 100%;width: 100%; display:-webkit-box;display:-moz-box;display:-o-box;display:-ms-box;display:box;' +
                    '-webkit-box-align: center; -moz-box-align: center;-o-box-align: center;-ms-box-align: center;box-align: center;' +
                    '-webkit-box-pack: center; -moz-box-pack: center;-o-box-pack: center;-ms-box-pack: center;box-pack: center;' +
                    '-webkit-box-orient: horizontal; -moz-box-orient: horizontal;  -o-box-orient: horizontal; -ms-box-orient: horizontal;box-orient: horizontal; ">' +
                    '<div style="background: white;height: 100px;width: 30%; display:-webkit-box;display:-moz-box;display:-o-box;display:-ms-box;display:box;' +
                    '-webkit-box-align: center; -moz-box-align: center;-o-box-align: center;-ms-box-align: center;box-align: center;' +
                    '-webkit-box-pack: center; -moz-box-pack: center;-o-box-pack: center;-ms-box-pack: center;box-pack: center;' +
                    '-webkit-box-orient: horizontal; -moz-box-orient: horizontal;  -o-box-orient: horizontal; -ms-box-orient: horizontal;box-orient: horizontal; " >' +
                    '<img id="yzh_loadingimage" src="' + this.imagename + '" height="30px" width="30px" style=" vertical-align:middle;-webkit-transition:all 1s linear;-o-transition:all 1s linear;-ms-transition:all 1s linear;-moz-transition:all 1s linear;transition:all 1s linear;">' +
                    '<span id="ajaxloader" style="vertical-align:middle;"> ' + this.loadinginfo + '</span></div>' + '</div> </div>'
                );
                this.root.appendTo($('body'));
                this.root.on("touchstart touchmove touchend MSPointerDown MSPointerMove MSPointerUp", function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                });
                if (! this.loadingshowimg || ! this.loadingshowimg.length) {
                    this.loadingshowimg = $('#yzh_loadingimage');
                }
            }
        },
        showloading: function() {
            if (this.loadingmode == 1) {
                this.startRotate();
            } else if (this.loadingmode == 2) {
                this.root.css('display', 'block');
            }
        },
        hideloading: function() {
            if (this.loadingmode == 1) {
                this.stopRotate();
            } else if (this.loadingmode == 2) {
                this.root.css('display', 'none');
            }
        },
        showinfo: function() {
            if (! loadModul.loadingshowimg) {
                alert('null');
            } else {
                alert('done');
            }
        },
        startRotate: function() {
            this.flag = true;
            this.root.css('display', 'block');
            if (loadModul.loadingshowimg.length) {
                this.n = 0;
                loadModul.loadingshowimg.css('transform', 'rotate(0deg)');
                setTimeout(this.goRotate, 100);
            }
        },
        stopRotate: function() {
            this.flag = false;
            this.root.css('display', 'none');
        },
        goRotate: function() {
            loadModul.n = loadModul.n + 1;
            if (loadModul.loadingshowimg.length && loadModul.flag) {
                loadModul.loadingshowimg.css('transform', 'rotate(' + (loadModul.rate * loadModul.n) + 'deg)');
                setTimeout(loadModul.goRotate, 1000);
            }
        }
    }
    
    function getOnlyDATA(url, afterload, datamanage,flag, title, urlindex) {
        loadModul.init();
        inurl = url;
        $.support.cors = true;
        $.ajax({
            url: inurl,
            dataType: "json",
            beforeSend: function(XMLHttpRequest) {
                if (flag) {
                    loadModul.showloading();
                }
            },
            success: function(data, textStatus) {
                if (title) {
                    afterload(datamanage(data), title);
                } else {
                    afterload(datamanage(data));
                }
                if (flag) {
                    loadModul.hideloading();
                }
            },
            complete: function(XMLHttpRequest, textStatus) {
                if (flag) {
                    loadModul.hideloading();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (flag) {
                    loadModul.hideloading();
                }
            }
        });
    }
    
    function getDATA(url, afterload, flag) {
        var showflag = flag ? flag : false;
        url = 'http://ciicdevelop1php.duapp.com/xd/api.php?t=xml&u=' + encodeURIComponent(url);
        var datamanage = function(data) {
            xmlData = data['item'];
            return xmlData;
        }
        getOnlyDATA(url, afterload, datamanage, showflag);
    }
    
    function getOneNewsList(urlindex, afterload, flag) {
        var showflag = flag ? flag : false;
        var onedata = xmlData[urlindex];
        var title = onedata['title'];
        var url = onedata['url'];
        url = 'http://rank.china.com.cn:8080/iphone/json1.jsp?url=' + url;
        url = 'http://ciicdevelop1php.duapp.com/xd/api.php?u=' + encodeURIComponent(url);
        var datamanage = function(data) {
            return data;
        }
        getOnlyDATA(url, afterload, datamanage, showflag, title, urlindex);
    }
    
    yzh_fetchDATA.getOneNewsList = getOneNewsList;
    yzh_fetchDATA.getDATA = getDATA;
})(yzh_fetchDATA);