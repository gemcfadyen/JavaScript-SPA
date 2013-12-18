/* modal returns a promise */

define(["lib/html", "vendor/q"], function (html, Q) {
    var _overlayDiv;
    var _deferred;
    
    function show(htmlPath) {
        _deferred = Q.defer();
        exported.promise = _deferred.promise; //everytime call 'show' start a new promise and set the exported promise to that. The value will change each time which is why we dont want it set at the bottom in exported.
        _overlayDiv = document.getElementById("overlay");
        _overlayDiv.style.visibility = "visible";
        return html.load(htmlPath, "overlay");
    }
    
    function hide(result){
        _overlayDiv.style.visibility = "hidden";
        _deferred.resolve(result); // resolve that promise
    }
    
    var exported = {
        show: show,
        hide: hide
    };
    
    return exported;
});