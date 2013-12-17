 /* data folder has a list of animals - which represents the 'database' */
define(["lib/route", "lib/html", "lib/http", "lib/render"], function (route, html, http, render) {
    function setup(element) {
        http("GET", "/animals").then(
            function (json) {
                var animals = JSON.parse(json); /* turns JSON into a real object */
                render.repeaters(element, {animals: animals.items});           
            },
            function (error) {
                window.alert("Error: " + error);
            });
    }

    route("/animals", function () {
        html.load("animals").then(setup);
        /* routing will call load html which returns the dom element the html is rendered into. this gets passed to a setup function */
    });
});