var k = 750;
(function (win, doc) {
    if (!win.addEventListener) return;
    var html = document.documentElement;
    if (doc.documentElement.currentStyle) {
        var user_webset_font = doc.documentElement.currentStyle['fontSize'];
    } else {
        var user_webset_font = getComputedStyle(doc.documentElement, false)['fontSize'];
    }
    var xs = parseFloat(user_webset_font) / 16;
    function setFont() {
        var html = document.documentElement;
        html.style.fontSize = html.clientWidth / k * 100 / xs + "px";
    }
    setFont();
    setTimeout(function () {
        setFont();
    }, 300);
    doc.addEventListener('DOMContentLoaded', setFont, false);
    win.addEventListener('resize', setFont, false);
    win.addEventListener('load', setFont, false);
})(window, document);