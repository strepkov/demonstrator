function paintRandomImgae() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var width = parseInt(c.getAttribute("width"));
    var height = parseInt(c.getAttribute("height"));

    var imgData = ctx.createImageData(width, height);
    var i;
    for (i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i+0] = randomInt(0, 255);
        imgData.data[i+1] = randomInt(0, 255);
        imgData.data[i+2] = randomInt(0, 255);
        imgData.data[i+3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);   // set x and y
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}