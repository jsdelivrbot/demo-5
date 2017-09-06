$(function(){
    var nav = $(".nav");
    var init = $(".nav .m").eq(0);
    var block = $(".nav .block");
    block.css({
        "left": init.position().left 
    });
    nav.hover(function() {},
    function() {//确认初始位置
        block.stop().animate({
            "left": init.position().left 
        },
        500);
    });
    $(".nav").slide({
        titCell: ".m",
        delayTime: 300,
        defaultIndex: 0,
        startFun: function(i, c, s, tit) {

            block.stop().animate({//确定停留位置
                "left": tit.eq(i).position().left
            },
            500);
        }
    });
});


