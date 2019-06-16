$(function() {
    $('.login').on('tap', function() {
        var username = $('.mui-input-username').val();
        var password = $('#password').val();

        if (!$.trim(username)) {
            mui.toast('请输入用户名', { duration: 2000, type: "div" });
            return;
        }
        if (!password.trim()) {
            mui.toast('请输入密码', { duration: 2000, type: "div" });
            return;
        }
        $.ajax({
            type: "post",
            url: "/user/login",
            data: {
                username: username,
                password: password
            },
            beforeSend: function() {
                $('.login').html('正在登录...');
            },
            success: function(response) {
                if (response.success) {
                    mui.toast('登录成功,2秒后跳转', { duration: 2000, type: "div" });
                    // mui.alert('登录成功,2秒后跳转', 'xxx', '确认', function() { location.href = 'user.html'; })
                    setTimeout(function() {
                        location.href = 'user.html';
                        $('.login').html('登录');
                    }, 2000);
                } else {
                    mui.toast(response.message, { duration: 2000, type: "div" });
                }
            }
        });
    });
})