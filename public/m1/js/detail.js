 var size;
 $(function() {
     var num = 0;
     var id = getParamsByUrl(location.href, 'id');

     $.ajax({
         type: "get",
         url: "/product/queryProductDetail",
         data: { id: id },
         success: function(res) {
             if (res) {
                 var html = template('detail', res);
                 num = res.num;
                 $('.my-content').html(html);
                 var gallery = mui('.mui-slider');
                 gallery.slider({
                     interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
                 });
             }
         }
     });

     $('.my-content').on('tap', '.size span', function() {

         $(this).addClass('active').siblings().removeClass('active');
         size = $(this).html();

     });
     $('.my-content').on('tap', '.reduce', function() {
         var reduce = $('.selectNum input').val();
         reduce--
         if (reduce < 1) {
             reduce = 1;
         }
         $('.selectNum input').val(reduce);
     });
     $('.my-content').on('tap', '.increase', function() {
         var increase = $('.selectNum input').val();
         increase++;
         if (increase > num) {
             increase = num;
         }
         $('.selectNum input').val(increase);

     });
     $('.my-content').on('tap', '#addCart', function() {
         var productId = id;
         var num = $('.selectNum input').val();
         size = size;
         if (!size) {
             mui.toast('请选择尺码')
             return
         }
         $.ajax({
             type: "post",
             url: "/cart/addCart",
             data: {
                 productId,
                 num,
                 size
             },
             success: function(res) {
                 if (res.success) {
                     mui.confirm('已添加至购物车，是否跳转到购物车？', '温馨提示', function(message) {
                         if (message.index == 1) {
                             location.href = 'cart.html'
                         }
                     });
                 } else {
                     mui.toast(res.message)
                 }
             }
         });
     })

 });