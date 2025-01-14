/**
 * login.js Created by EKuter-si.yu on 2017/6/20.
 */
/**表单登录**/
function loginForm(){
    // save();
    $.ajax({
        url:submitLoginFormUrl,
        dataType:"json",
        type:'POST',
        async:true,
        data:$("#login_form").serialize(),
        contentType:'application/x-www-form-urlencoded; charset=UTF-8',//防止乱码

        success:function(data){

            if(data.status == 0){
                window.location="index";
            }else{
                $('.title').hide().next().html(data.msg).css('display','inline-block').show();
                window.location.href = "login.html";
            }
        }
    }); 
   
}

/**回车登录**/
function keyDownLogin(e){
    var currKey = 0;e = e||event;
    currKey = e.keyCode||e.which||e.charCode;
    if (event.keyCode==13){//回车键的键值为13
        $("#loginId").click();
    }
}

/**自动登录**/
function checkCookie(){
    if ($.cookie("remember") == "true") {
      $("#rememberMe").attr("checked", true);
      $("#txt_username").val($.cookie("username"));
      $("#txt_password").val($.cookie("password"));
      // loginAjax();
    }         
}

/**记住用户名密码**/
// function save() {

//     if ($("#rememberMe").prop("checked")) {//记住密码
//         var str_username = $("#txt_username").val();
//         var str_password = $("#txt_password").val();
//         $.cookie("remember", "true", { expires: 7 }); //存储一个带7天期限的cookie
//         $.cookie("username", str_username, { expires: 7 });
//         $.cookie("password", str_password, { expires: 7 });
//     }
//     else {
//         $.cookie("rememberMe", "false", { expire: -1 });
//         $.cookie("username", "", { expires: -1 });
//         $.cookie("password", "", { expires: -1 });
//     }
// };

$(function(){
    // checkCookie();
    $("#loginId").click(loginForm);
    /*用户名和密码获取焦点后,切换图标*/
    $("#user>input").focus(function(){
      $(this).next().css("background-position","-10px -42px");
    }).blur(function(){
      $(this).next().css("background-position","-10px -6px");
    });
    $("#password>input").focus(function(){
      $(this).next().css("background-position","-52px -42px");
    }).blur(function(){
      $(this).next().css("background-position","-52px -7px");
    });

});

