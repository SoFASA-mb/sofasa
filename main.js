function getStylesheet() {
    var currentTime = new Date().getHours();
    if (0 <= currentTime&&currentTime < 5) {
    document.write("<link rel='stylesheet' href='nightshift.css' type='text/css'>");
    }
    if (18 <= currentTime&&currentTime < 24) {
    document.write("<link rel='stylesheet' href='nightshift.css' type='text/css'>");
    }
}

getStylesheet();