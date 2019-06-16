//  当页面的DOM结构加载完成之后，执行回调

$(function() {

    // 初始化区域滚动组件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    $.ajax({
        url: "/category/queryTopCategory",
        type: "get",
        success: function(response) {
            // console.log(response);
            var html = template('category-first', { res: response.rows });
            // console.log(html);
            $('.link').html(html);
            if (response.rows.length) {
                var id = response.rows[0].id;
                $('#links').find('a').eq(0).addClass('active');
                getSecondCategory(id);
            }
        }
    });

    $('#links').on('click', 'a', function() {
        var id = $(this).attr('data-id');
        $(this).addClass('active').siblings('a').removeClass('active');
        console.log(id);
        getSecondCategory(id);
    });

    function getSecondCategory(id) {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategory",
            data: { id: id },
            success: function(response) {
                // console.log(response);
                var html = template('category-second', { res: response.rows });
                // console.log(html);
                $('.brand-list').html(html);
            }
        });
    }

});