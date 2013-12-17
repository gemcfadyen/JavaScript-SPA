/*
repeater
    find elements with data-repeat
    get HTML for elements
    call doT to create function
    call function with data
    put HTML back in DOM
*/


define(["vendor/doT"], function (doT) {

    function compileTemplate(templateElement) {
        templateElement.removeAttribute("data-repeat");
        var html = templateElement.outerHTML; /* outer is all the html tags including its own */
        return doT.template(html);
    }

    function renderTemplate(templateElement, value) {
        var parent = templateElement.parentNode;

        if (value && value.length) {
            var template = compileTemplate(templateElement);

            var builder = []; //so it acts like stringbuilder

            for (var i = 0; i < value.length; i++) {
                builder.push(template(value[i])); //push strings into the array
            }

            var div = document.createElement("div"); //create a temp element as a working space
            div.innerHTML = builder.join("\n");

            while (div.firstChild) { //has it got a first child, if so move it over , repeat until no first children
                parent.insertBefore(div.firstChild, templateElement); //parent is the ul. There is no insertAfter
            }
        }

        parent.removeChild(templateElement); /* goes from being hidden by css then removing it */

    }

    function renderRepeaters(element, data) {
        for (var property in data) {
            if (data.hasOwnProperty(property)) {
                var value = data[property];
                var selector = "[data-repeat='" + property + "']";
                var templates = element.querySelectorAll(selector); //querySelector returns the first one , querySelectorAll finds the whole lot

                for (var i = 0; i < templates.length; i++) {
                    renderTemplate(templates[i], value);
                }
            }
        }

    }

    return {
        repeaters: renderRepeaters /* expose our renderRepeaters function and call it repeaters */
    };
});