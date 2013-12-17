define(["lib/render"], function (render) {

    describe("the repeaters method", function () {
        /* double quotes or single quotes can be used */
        it("should render an unordered list", function () {
            /* for html use single quotes as html can have double quotes in it */

            // Arrange
            var templateHtml = '<u1 id="actual"><li data-repeat="animals"><a href="{{=it.id}}">{{=it.name}}</a></li></ul>';

            var div = document.createElement("div"); //creates elememt in memory 
            div.innerHTML = templateHtml;

            var animals = [
                {
                    id: 1,
                    name: "Timon"
                },
                {
                    id: 2,
                    name: "Pumba"
                }
            ];

            // Act
            render.repeaters(div, {animals: animals}); //going to modify the div element for us

            // Assert
            var ul = div.querySelector("#actual"); // ul is unordered list
            var lis = ul.querySelectorAll("li");
            expect(lis.length).toEqual(2);
            for (var i = 0; i < lis.length; i++) {
                var li = lis[i]; // li is list item
                var a = li.firstChild;
                expect(a).toBeDefined();
                console.log(li.outerHTML);
                console.log(a);
                expect(a.attributes["href"].value).toEqual(animals[i].id.toString());
            };
        });
    });

});