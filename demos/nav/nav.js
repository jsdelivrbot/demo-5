$(function () {

    var li = $(".title_ul").children("li");

    for (var i = 0; i < li.length; i++) {
        var url = window.location.pathname;
        var url = url.replace("/", "");
        if (url.indexOf(li[i].id)!=-1) {
            li[i].className = "active";

        } else {
            li[i].className = "";
        }
    }
});