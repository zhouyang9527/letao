var code;
$(function() {
    getCode();
    $('.register').on('tap', function() {
        var username = $('.mui-input-username').val();
        var mobile = $('.mui-input-moblie').val();
        var password = $('#password').val();
        var againPass = $('#mui-input-againPass').val();
        var vCode = $('.mui-input-vCode').val();
        if (!$.trim(username)) {
            mui.toast('请输入用户名', { duration: 2000, type: "div" });
            return;
        }
        var regTel = /^1[3456789]\d{9}$/;
        if (!regTel.test(mobile)) {
            mui.toast('请输入正确的手机格式', { duration: 2000, type: "div" });
            return;
        }
        if (!$.trim(password)) {
            mui.toast('请输入密码', { duration: 2000, type: "div" });
            return;
        }
        if (!$.trim(againPass)) {
            mui.toast('请再次输入密码', { duration: 2000, type: "div" });
            return;
        }
        if (password !== againPass) {
            mui.toast('两次密码不一致', { duration: 2000, type: "div" });
            return;
        }
        if (vCode != code) {
            mui.toast('验证码不正确', { duration: 2000, type: "div" });
            return;
        }
        $.ajax({
            type: "post",
            url: "/user/register",
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success: function(response) {
                if (response.success) {
                    mui.toast('注册成功', { duration: 2000, type: "div" });
                    clear();
                    code = null;
                } else {
                    mui.toast(response.message, { duration: 2000, type: "div" });
                    clear();
                    code = null;
                }
            }
        });
    });

});

function getCode() {
    $('.getCode').on('tap', function() {
        $.ajax({
            type: "get",
            url: "/user/vCode",
            success: function(response) {
                console.log(response.vCode);
                code = response.vCode;
            }
        });
    });
}

function clear() {
    $('#password').val('');
    $('#mui-input-againPass').val('');
    $('.mui-input-vCode').val('');
}