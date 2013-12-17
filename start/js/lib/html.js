define(["vendor/q", "lib/http"], function (Q, http) {

    function _setDom(elementId, html) {
        var div = document.createElement("div");
        div.innerHTML = html;

        var parent = document.getElementById(elementId);
        parent.innerHTML = "";
        parent.appendChild(div);
        return div;
    }

    /* http returns a promise . we are working with asynchrounous.  We have a promise wrapped in a promise */
    function load(file, elementId) {
        /* load html and put it in a DOM elemet */
        var deferred = Q.defer();
        elementId = elementId || "app"; /* if you dont tell me where to put it, i'll put it in the app element */

        http("GET", "html/" + file + ".html").
        then(function (text) {  /* when the promise returns call this */
                var newDiv = _setDom(elementId, text);
                deferred.resolve(newDiv);
            },
            function (error) {
                deferred.reject(error);
            }
        );
        return deferred.promise;
    }
    
    return {
        load: load
    };
});