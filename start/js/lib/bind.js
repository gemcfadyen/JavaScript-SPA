define([], function () {

    function bindElement(element, data) {
        element.addEventListener("change", function () {   //look for the change event
            data[element.id] = element.value;
        });
    }


    function bindForm(form, data) {
        if (!data.watch) {
            throw "Data for binding must be observable";
        }

        //does the form have a field for that property, if it does set the field to the value it has at present
        //change to the object is being reflected in the form
        data.watch(function (propertyName) {
            if (form[propertyName]) {
                form[propertyName].value = data[propertyName];
            }
        });

        var inputs = form.querySelectorAll("input"); //iterate through form's input fields
        console.log(inputs);
        for (var i = inputs.length - 1; i >= 0; i--) {
          
            bindElement(inputs[i], data);
        }
    }


    return {
        form: bindForm
    };
});