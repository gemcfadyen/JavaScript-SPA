define(["lib/route"], function (route) {
    function makeWindow(hash) {
        var href = "http://batterseaparkzoo.org/";
        var on = {};
        
        return {
            location: {
                hash: hash,
                href: href,
                replace: function (newHref) {
                    this.href = newHref;
                    this.hash = newHref.substring(newHref.indexOf("#"));
                    on.hashchange();
                }
            },
          
            addEventListener: function (e, fn) {
                on.hashchange = fn;
            }
        }
    }

    describe("the route module", function () {
        var called;

        route("/", function () {
            called = "/"; /* captured variable - a closure */
        });

        it("should resolve the home route", function () {
           called = undefined; /* called is a shared var as its a closure - so reset it each time */
            route.run(makeWindow("#/"));
            expect(called).toEqual("/");
        });

        it("should redirect to #/ for empty hash", function () {
            called = undefined;
            var win = makeWindow("");
            route.run(win);
            expect(win.location.href).toEqual("http://batterseaparkzoo.org/#/");
        });
    });


});