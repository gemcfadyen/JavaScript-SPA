define(["lib/route", "lib/html"], function (route, html) { /* home module requires the route.js (dont need the .js as it knows its .js) - home depends on the route module */

    route("/", function () {
        html.load("home").then(function (element) {
        });
    });
});
