define(["lib/route", "lib/html", "lib/http"], function (route, html, http) {
    function setup(element) {
        http("GET", "/animals").then(
            function (json) {
                var animals = JSON.parse(json); /* turns JSON into a real object */
//                var ul = document.createElement("ul"); /* unordered list ul. Convention is to use the html tag name as the same as the variable */
//                animals.items.forEach(function (animal) { /* the animals that comes back is an object.  To get the list then get the items on that object */
//                    var li = document.createElement("li"); /* list item li */
//                    li.innerHTML = '<a href="#/animals/' + animal.id + '">' + animal.name + '</a>';
//                    ul.appendChild(li); /* add the list item to the unordered list */
//                });
                var container = element.querySelector(".container"); /* query selector is JQuery light - uses css selectors to identify elements within other elements .container is a class, to look for something by id you use a #, tagname you use the tagname */
                container.appendChild(ul);
                /* data folder has a list of animals - which represents the 'database' */
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