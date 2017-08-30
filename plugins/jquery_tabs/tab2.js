;(function ($) {
    $.fn.tabs = function (opt) {
        var def = { evType: "click" }; //定义了一个默认配置
        var opts = $.extend({}, def, opt);
        var obj = $(this);

        $("ul li:first", obj).addClass("active");
        obj.children("div").hide();
        obj.children("div").eq(0).show();

        $("ul li", obj).bind(opts.evType, function () {
            $(this).attr("class", "active").siblings("li").attr("class","");
            var id = $(this).find("a").attr("href").substring(1);
            obj.children("div").hide();
            $("#" + id, obj).show();
        });
    };
})(jQuery);