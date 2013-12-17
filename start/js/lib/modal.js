/* modal returns a promise */

define(["lib/html"], function (html) {
    var _overlayDiv;

    function show(htmlPath) {
        _overlayDiv = document.getElementById("overlay");
        _overlayDiv.style.visibility = "visible";
        return html.load(htmlPath, "overlay");
    }
    
    function hide(){
        _overlayDiv.style.visibility = "hidden";
    }
    
    return {
        show: show,
        hide: hide
    };
});