/* i'm a module - keep an instance of me available for the application*/
/* when the path is X go to this part of the application */

define([], function () {
    "use strict";

    var _routes = {}; /* {} is an object literal - creates an empty object */

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
        }
    }

    function route(path, fn) {
        _routes[path] = fn;
    }


    route.run = _run;
    return route; /* return the function route*/

});