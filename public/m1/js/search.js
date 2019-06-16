$(function() {

    $('#search-btn').on('tap', function() {
        var keyword = $(this).siblings('input').val();
        if (keyword) {
            keyArr.push(keyword);
            [...keyArr] = new Set(keyArr);
            /* 
                filter  
            
                indexOf
             */
            localStorage.setItem('keyArr', JSON.stringify(keyArr));
            location.href = 'search-result.html?keyword=' + keyword;
        } else {
            mui.toast('请输入关键字', { duration: 2000, type: "div" });
        }
    });
    var keyArr = [];
    if (localStorage.getItem('keyArr')) {
        keyArr = JSON.parse(localStorage.getItem('keyArr'));
        console.log(keyArr);
        var html = template("viewTemplate", { 'res': keyArr });
        console.log(html);
        $('#search-view').html(html);
    }

});