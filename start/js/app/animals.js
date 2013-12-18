 /* data folder has a list of animals - which represents the 'database' */
 define(["lib/route", "lib/html", "lib/http", "lib/render", "app/addAnimal"], function (route, html, http, render, addAnimal) {

     var _element, _animals;

     var handlers = {
         add: function () {
             addAnimal().then(function (newAnimal) {
                 if (newAnimal) {
                     _animals.items.push(JSON.parse(newAnimal));
                     render.update(_element, {
                         animals: _animals.items
                     }); // {keyed list of things}
                 }
             });
         }
     };

     function _render(element) {
         _element = element;
         http("GET", "/animals").then( // when the http returns then
             function (json) {
                 _animals = JSON.parse(json); /* turns JSON into a real object */
                 render.repeaters(element, {
                     animals: _animals.items
                 });
             },
             function (error) {
                 window.alert("Error: " + error);
             });
     }

     function setup(element) {
         _render(element);
         var clickables = element.querySelectorAll("[data-click]"); //get all the elements with a data-click attribute

         for (var i = clickables.length - 1; i >= 0; i--) {
             var functionName = clickables[i].attributes["data-click"].value;
             if (handlers[functionName]) {
                 clickables[i].addEventListener("click", handlers[functionName]);
             }
         }
     }

     route("/animals", function () {
         html.load("animals").then(setup);
         /* routing will call load html which returns the dom element the html is rendered into. this gets passed to a setup function */
     });
 });