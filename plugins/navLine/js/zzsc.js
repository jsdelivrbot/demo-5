$(function(){
    var nav = $(".nav");
    var init = $(".nav .m").eq(0);
    var block = $(".nav .block");
    block.css({
        "left": init.position().left 
    });
    nav.hover(function() {},
    function() {//ȷ�ϳ�ʼλ��
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

            block.stop().animate({//ȷ��ͣ��λ��
                "left": tit.eq(i).position().left
            },
            500);
        }
    });
});


