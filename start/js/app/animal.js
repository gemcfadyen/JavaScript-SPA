define(["lib/route", "lib/html", "lib/http", "lib/observable", "lib/bind", "lib/validate"], function (route, html, http, observable, bind, validate) {
    var _id, _animal;
    var handlers = {
        back: function() {
            window.location = "#/animals"; //where you want to go back to on the back button
        }
    }
    
    function save(){
        http("PUT", "/animals", JSON.stringify(_animal));
    }
    
    function setup(element) {
        http("GET", "/animals/" + _id).then(
        function(json){
            _animal = JSON.parse(json);
            _animal.species = _animal.species || "";
            var model = observable.wrap(_animal);
            var form = element.querySelector("#animal");
            bind.form(form, model);
            
            form.addEventListener("submit", function(e){
                e.preventDefault();
                save();
            });
            validate.init(form);
        });
        
        bind.handlers(element, handlers);
    }

    //parameter comes into the routing system which we store in a shared variable
    route("/animals/{id}", function (id) { //define the route, pass the element to setup and return setup from this module
        _id = id;
        html.load("animal").then(setup);
    });

    return {
        setup: setup,
        save: save
    };
});