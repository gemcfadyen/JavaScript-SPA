define(["vendor/q"], function (Q) {
    function http(method, url, data, config) {
        var deferred = Q.defer();
        var request = new XMLHttpRequest(); /* XHR */

        request.open(method, url);
        if (method[0] === "P") {
            request.setRequestHeader("Content-Type", "application/json");
        }


        request.onload = function () { /* request.addEventListener(onload) is an alternative way of defining this */
            if (method === "POST" && request.status === 201) {
                var location = request.getResponseHeader("Location");
                if (location) {
                    http("GET", location).then(
                        function (data) {
                            debugger;
                            deferred.resolve(data);
                        },
                        function (error) {
                            deferred.reject(error);
                        });
                    return;
                }
            }
            
            if (request.status > 199 && request.status < 300) {
                deferred.resolve(request.responseText);
            } else {
                deferred.reject(request.status);
            }
        };

        request.onerror = function () {
            deferred.reject(-1);
        };

        request.send(data);
        return deferred.promise;
    }

    return http;
});