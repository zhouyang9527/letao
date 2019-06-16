var code;
$(function() {
    getCode();
    $('#modify-btn').on('tap', function() {
        // mui.toast('1');
        var originPass = $('#originPass').val();
        var newPass = $('#newPass').val();
        var confimNewPass = $('#confimNewPass').val();
        var vCode = $('#vCode').val();

        if (!$.trim(originPass)) {
            mui.toast('请输入原密码', { duration: 2000, type: "div" });
            return;
        }
        if (!$.trim(newPass)) {
            mui.toast('请输入新密码', { duration: 2000, type: "div" });
            return;
        }
        if (!$.trim(confimNewPass)) {
            mui.toast('请再次输入新密码', { duration: 2000, type: "div" });
            return;
        }
        if (confimNewPass != newPass) {
            mui.toast('两次输入不一致', { duration: 2000, type: "div" });
            return;
        }
        if (!$.trim(vCode)) {
            mui.toast('请输入认证码', { duration: 2000, type: "div" });
            return;
        }
        if (vCode != code) {
            mui.toast('认证码错误', { duration: 2000, type: "div" });
            return;
        }
        $.ajax({
            type: "post",
            url: "/user/updatePassword",
            data: {
                oldPassword: originPass,
                newPassword: newPass,
                vCode: vCode
            },
            success: function(res) {
                // console.log(res);
                if (res.success) {
                    mui.toast('修改密码成功', { duration: 2000, type: "div" });
                    setTimeout(function() {
                        location.href = 'login.html';
                    }, 2000);
                }
                if (res.error) {
                    mui.toast(res.message, { duration: 2000, type: "div" });
                }
            }
        });
    });

});

function getCode() {
    $('.getCode').on('tap', function() {
        $.ajax({
            type: "get",
            url: "/user/vCodeForUpdatePassword",
            success: function(response) {
                console.log(response.vCode);
                code = response.vCode;
            }
        });
    });
}