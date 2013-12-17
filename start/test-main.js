var tests = [];

/* karma object is created on the window with all the files */
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) { /* the slashes: / contains regex /  If the file ends in Spec.js then put it in the tests array $means end of                                         the line therefore 'ends with' */
            tests.push(file);
        }
    }
}

requirejs.config({
    baseUrl: "base/js",
    deps: tests, /* deps is dependencies */
    callback: window.__karma__.start
});