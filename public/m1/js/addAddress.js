var flag = true;
$(function() {
    var picker = new mui.PopPicker({ layer: 3 });
    picker.setData(cityData);

    $('body').on('tap', '#selectCity', function() {
        picker.show(function(selectItems) {
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
        })
    });
    var edit = getParamsByUrl(location.href, 'edit');
    if (edit == 1) {
        var editAddress = JSON.parse(localStorage.getItem('editAddress'));
        if (editAddress) {
            var html = template('addAddress', { 'v': editAddress });
            $('.mui-input-group').html(html);
        }
    } else {
        var html = template('addAddress', { 'v': {} });
        $('.mui-input-group').html(html);
    }

    $('.mui-input-group').on('tap', '#addAddressBtn', function() {
        var recipients = $('#recipients').val();
        var postcode = $('#postcode').val();
        var address = $('#selectCity').val();
        var addressDetail = $('#addressDetail').val();
        var data = {
            recipients,
            postcode,
            address,
            addressDetail
        }
        if (flag) {
            flag = false;
            if (!$.trim(recipients)) {
                flag = true;
                mui.toast('请输入收货人姓名');
                return;
            }
            if (!$.trim(postcode)) {
                flag = true;
                mui.toast('请输入邮政编码');
                return;
            }
            if (!$.trim(address)) {
                flag = true;
                mui.toast('请选择省市区');
                return;
            }
            if (!$.trim(addressDetail)) {
                mui.toast('请输入详细地址');
                flag = true;
                return;
            }
            if (edit == 0) {
                $.ajax({
                    type: "post",
                    url: "/address/addAddress",
                    data: data,
                    success: function(res) {
                        if (res.success) {
                            mui.toast('添加成功');
                            setTimeout(function() {
                                flag = true;
                                location.href = 'address.html';
                            }, 200);
                        }
                    }
                });
            } else {
                data.id = editAddress.id;
                $.ajax({
                    type: "post",
                    url: "/address/updateAddress",
                    data: data,
                    success: function(res) {
                        console.log(res);

                        if (res.success) {
                            mui.toast('修改成功');
                            setTimeout(function() {
                                flag = true;
                                location.href = 'address.html';
                            }, 200);
                        }
                    }
                });
            }
        }

    });




});