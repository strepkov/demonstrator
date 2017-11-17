function sendData() {
    var text = document.getElementById('source').value;

    $.ajax({
        type: "POST",
        //            url: "137.226.168.11:80",
        url: "http://127.0.0.1:5000",
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