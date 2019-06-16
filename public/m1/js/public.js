$(function() {
    $('body').on("tap", "a", function() {
        mui.openWindow({
            url: $(this).attr('href')
        })
    });
});

function getParamsByUrl(url, name) {
    var params = url.substr(url.indexOf('?') + 1);

    var key = params.split('&');

    for (var i = 0; i < key.length; i++) {
        var current = key[i].split('=');
        if (current[0] == name) {
            return current[1];
        } else {
            return null;
        }
    }

}