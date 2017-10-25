$(function(){
    var length=$(".img li").size();
    for(var i=1;i<=length;i++){
        $(".num").append("<li>"+i+"</li>");
    }
    $(".img li").first().show();
    $(".num li").first().addClass("active");
   $(".num li").mouseover(function(){
       $(this).addClass("active").siblings().removeClass("active");
       var index=$(this).index();
        i=index;
       $(".img li").eq(index).stop().fadeIn(300).siblings().stop().fadeOut(300);
   });
   var i=0;//记录当前下标
   var t=setInterval(move,1000);
   function move(){
       i++;
       if(i==length){
           i=0;
       }
       $(".num li").eq(i).addClass("active").siblings().removeClass("active");
       $(".img li").eq(i).stop().fadeIn(300).siblings().stop().fadeOut(300);

   }
    function moveL(){
        i--;
        if(i==-1){
            i=length-1;
        }
        $(".num li").eq(i).addClass("active").siblings().removeClass("active");
        $(".img li").eq(i).stop().fadeIn(300).siblings().stop().fadeOut(300);

    }
   $('.out').hover(function(){
        clearInterval(t);
   },function(){
       t=setInterval(move,1000);
   });

    $(".left").click(moveL);
    $(".right").click(move);
})