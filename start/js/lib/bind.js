define([], function () {
    function bindForm(form, data) {
        if (!data.watch) {
            throw "Data for binding must be observable";
        }

        data.watch(function (propertyName) {
            if (form[propertyName]) {
                form[propertyName].value = data[propertyName];
            }
        });
    }

    return {
        form: bindForm
    };
});