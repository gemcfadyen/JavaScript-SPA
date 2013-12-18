define(["lib/observable"], function (observable) {

    describe("the observable wrapper", function () { //allows a property to be changed on an animal and that change updates the underlying base object


        it("should work", function () {
            var base = {
                id: 1,
                name: "Simba"
            };
            var wrapped = observable.wrap(base);
            wrapped.id = 2;
            wrapped.name = "Bob";
            expect(wrapped.id).toEqual(2);

        });

        it("should tell us when a property changes", function () {
            var changedProperty, newValue;

            var base = {
                id: 1,
                name: "Simba"
            };
            var wrapped = observable.wrap(base);
            wrapped.watch(function (property) {
                changedProperty = property;
                newValue = wrapped[property];
            });
            wrapped.name = "The Lion King";

            expect(changedProperty).toEqual("name");
            expect(newValue).toEqual("The Lion King");
            expect(base.name).toEqual("The Lion King"); //updates the base object too
        });
    });
});