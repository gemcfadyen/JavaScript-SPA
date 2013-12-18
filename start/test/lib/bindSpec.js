define(["lib/bind", "lib/observable"], function (bind, observable) {

    describe("form binding", function () {

        function makeForm(){
              var html = '<form><input type ="text" id = "name"></form>';
            var div = document.createElement("div");
            div.innerHTML = html;
            return div.firstChild;
        }
        
         it("should initialize the form with object values", function () {
            var form = makeForm();
            var data = observable.wrap({ name: "Rafiki" });
            bind.form(form, data);
            expect(form.name.value).toEqual("Rafiki");
        });
        
        it("should update form with object changes", function () {
            var form = makeForm();
            var data = observable.wrap({ name: "" });
            bind.form(form, data);
            data.name = "Pumba";
            expect(form.name.value).toEqual("Pumba");
        });
        
        it("should update object with form changes", function(){  
            var form = makeForm();
            var data = observable.wrap({name: ""});
            bind.form(form, data);
            //we have changed form.name.value programatically here to ensure it is reflected in the underlying data object
            form.name.value = "Timon";
            var change = document.createEvent("UIEvents");
            change.initEvent("change", true, true);
            form.name.dispatchEvent(change);
            expect(data.name).toEqual("Timon");
        });
        
    });
});