 /* data folder has a list of animals - which represents the 'database' */
 define(["lib/route", "lib/html", "lib/http", "lib/render", "app/addAnimal"], function (route, html, http, render, addAnimal) {

     var handlers = {
         add: function () {
            addAnimal();
         }
     };

     function _render(element) {
         http("GET", "/animals").then( // when the http returns then
             function (json) {
                 var animals = JSON.parse(json); /* turns JSON into a real object */
                 render.repeaters(element, {
                     animals: animals.items
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
             if(handlers[functionName]){
                 clickables[i].addEventListener("click", handlers[functionName]);
             }
         }
     }

     route("/animals", function () {
         html.load("animals").then(setup);
         /* routing will call load html which returns the dom element the html is rendered into. this gets passed to a setup function */
     });
 });