define(["lib/bind", "lib/observable"], function (bind, observable) {

    describe("form binding", function () {

        it("should update form with object changes", function () {
            var html = '<form><input type ="text" id = "name"></form>';
            var div = document.createElement("div");
            div.innerHTML = html;
            var form = div.firstChild;

            var data = observable.wrap({ name: "" });
            bind.form(form, data);
            data.name = "Pumba";
            expect(form.name.value).toEqual("Pumba");
        });
    });
});