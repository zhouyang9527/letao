var address = null;
$(function() {
    $.ajax({
        type: "get",
        url: "/address/queryAddress",
        success: function(res) {
            var html = template('addressTpl', { result: res });
            $('#userInfo').html(html);
            address = res;
        }
    });

    $('#userInfo').on('tap', '.delete-btn', function() {
        var lis = $(this).parents('li');
        var li = this.parentNode.parentNode;
        console.log(li);

        console.log(lis);

        var id = $(this).attr('data-id');
        mui.confirm('确认删除吗？', function(message) {
            if (message.index) {
                $.ajax({
                    type: "post",
                    url: "/address/deleteAddress",
                    data: { id: id },
                    success: function(res) {
                        if (res.success) {
                            mui.toast('删除成功');
                            location.reload();
                        }
                    }
                });
            } else {
                mui.swipeoutClose(li);
            }

        });
    });

    $('#userInfo').on('tap', '.edit-btn', function() {
        /* 
        1.点击编辑后，获取该条信息的内容，可通过上面得到的所有收货地址信息，然后根据id值，得到当前收货地址信息
        2.当前收货信息存储在本地的localStorage，传递给编辑页面
         */

        // 1. 得到收货地址信息
        console.log(address);
        var editId = this.getAttribute('data-id');

        for (var i = 0; i < address.length; i++) {
            if (address[i].id == editId) {
                var getAddress = address[i]
                localStorage.setItem('editAddress', JSON.stringify(getAddress));
            }
        }
        location.href = 'addAddress.html?edit=1'
    });
});