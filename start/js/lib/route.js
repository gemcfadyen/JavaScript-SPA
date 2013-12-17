/* i'm a module - keep an instance of me available for the application*/
/* when the path is X go to this part of the application */

define([], function () {
    "use strict";

    var _routes = {}; /* {} is an object literal - creates an empty object */
    var _regexRoutes = [];

    function _run(_window) {
        _window = _window || window; /* if _window has a value then use that otherwise don't - way of mocking for our test */
        _window.addEventListener("hashchange", function () {
            _doRoute(_window);
        });

        if (_window.location.hash === "" || _window.location.hash === "#") {
            _window.location.replace(_window.location.href + "#/"); /* adds #/ to the end of the url and trigger the _run event via the event listener */
        } else {
            _doRoute(_window);
        }
    }

    function _doRoute(_window) {
        _window = _window || window;
        var path = _window.location.hash.substring(1);
        if (_routes[path]) { /* if it exists*/
            _routes[path](); /* call the function that is in there */
        } else {
            for(var i = _regexRoutes.length -1; i >=0 ; i--){
                if(_regexRoutes[i].regex.test(path)){
                    var match = _regexRoutes[i].regex.exec(path);
                    var params = match.slice(1, match.length);
                    _regexRoutes[i].fn.apply(undefined, params);
                }
            };
        }
    }

    function _extractRegex(path) {
        if (path.indexOf("{") < 0 || path.indexOf("}") < 0) {
            return null;
        }
        
        var parts = path.split("/");

        for (var i = 0; i < parts.length; i++) {
            if (/^{.+}$/.test(parts[i])) { //starts with { got some stuff in between and ends with a }
                parts[i] = "([^\\/]+)"; //give me the result of the regex - match on anything except a slash
            }
        }
        // example path:  animals/{id}/edit
        //replaces {id} part 
        //keeps /animals/ /edits
        var expr = "^" + parts.join("\\/") + "\\/?$"; //start of string is ^ and end of string is $ - these prevent partial matches
        return new RegExp(expr);
    }

    //trying to establish if the path contains {id}
    function route(path, fn) {
        var regex = _extractRegex(path);
        if (!regex) {
            _routes[path] = fn;
            return;
        }
        else{
            _regexRoutes.push({regex : regex, fn: fn});
        }
    }


    route.run = _run;
    return route; /* return the function route*/

});