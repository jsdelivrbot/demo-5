/* 代码整理：大头网 www.datouwang.com */
; (function ($) {
    $.extend({
        'nicenav': function (con,index) {
            con = typeof con === 'number' ? con : 400;
            var $lis = $('#nav>li'), $h = $('#buoy')
            $lis.hover(function () {
                $h.stop().animate({
                    'left': $(this).offsetParent().context.offsetLeft
                }, con);
            }, function () {
                $h.stop().animate({
                    'left':index
                }, con);
            })
        }
    });
}(jQuery));

