define([], function () {

    var errorCheckers = {
        required: function (field, errorElement) {
            field.addEventListener("change", function () {
                if (field.value) {
                    errorElement.style.visibility = "hidden";
                } else {
                    errorElement.style.visibility = "visible";
                }
            });
        }
    };

    function initElement(form, element) { //need the form to find the field with the span element on it
        element.style.visibility = "hidden"; //setting to hidden (rather than none) so that it leaves the space in the window layout (DOM) that the element would be taking up
        var dataFor = element.attributes["data-for"].value; //get the data-for attributes's value
        var parts = dataFor.split(":"); //split on the :
        var fieldId = parts[0]; //first part is fieldId
        var errorType = parts[1]; //second part is errorType
        var checker = errorCheckers[errorType];
        if (checker) {
            checker(form.querySelector("#" + fieldId), element);
        }
    }

    function init(form) {
        var errorElements = form.querySelectorAll(".error[data-for]"); //finds us all the elements which have the error class and the data-for attribute

        for (var i = errorElements.length - 1; i >= 0; i--) {
            initElement(form, errorElements[i]);
        }
    }


    return {
        init: init
    };
});