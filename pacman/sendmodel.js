function sendData() {
    var text = document.getElementById('source').value;

    $.ajax({
        type: "POST",
        url: "http://137.226.168.11:80",
        dataType: 'text',
        data: 'text='+text,
        crossDomain: true,
        success: function(msg) {
            alert(msg);
            console.log(msg);
            var $script = $("<script/>", {
                text: msg
            });
            $("head").append($script);
        },
        error: function(xhr, statusCode, error) {
            console.error(error);
        }
    });
}