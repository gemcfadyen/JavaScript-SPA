define(["lib/modal"], function (modal) {

    function setup(element) {
        var closers = element.querySelectorAll("[data-dismiss]");
        for (var i = closers.length - 1; i >= 0; i--) {
            closers[i].addEventListener("click", modal.hide);
        }
        
        var form = element.querySelector("form"); //find the first thing with a form tag
        form.addEventListener("submit", function (e) { //listen for a submit event
            e.preventDefault();
            var obj = {};
            var inputs = form.querySelectorAll("input");
            for(var i = inputs.length - 1; i>=0; i--){
                var input = inputs[i];
                var id = input.attributes["id"].value;
                obj[id] = input.value;
            }
            
            alert(JSON.stringify(obj));
        });
    }

    function addAnimal() {
        modal.show("addAnimal").then(
            setup,
            function (error) {
                alert(error);
            }
        );
    }

    return addAnimal;
});