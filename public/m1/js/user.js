var userInfo = null;
$.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    // 同步
    async: false,
    success: function(res) {
        if (res.error && res.error == 400) {
            location.href = "login.html";
        }
        userInfo = res;
    }
});
$(function() {
    $("#logout").on("tap", function() {
        $.ajax({
            type: "get",
            url: "/user/logout",
            success: function(response) {
                if (response.success) {
                    mui.toast('退出成功');
                    setTimeout(function() {
                        location.href = "index.html";
                    }, 2000);
                } else {
                    mui.toast('退出失败，请稍后再试');
                }
            }
        });
    });
    var html = template('userTpl', { res: userInfo });
    console.log(html);
    $('#userInfo').html(html);
});