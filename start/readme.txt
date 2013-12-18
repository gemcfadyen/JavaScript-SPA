Running Node JS and viewing the index.html
------------------------------------------
Install node from: http://nodejs.org/   It will automatically add node to your path.

On your command prompt to start the  local server
> node server.js 
You can view the index.hmtl in Chrome (or the brower of your choice) by going to 
localhost:3000
for IE 
http://localhost:3000

on your command prompt if you type 
> node

you will have a little freestyle editor that will allow you try out little snippets of javascript. Eg:
> var str= "Hello World"
undefined
> str
> str.split(" ")
This is useful when testing things like regular expressions.

To list out the global downloads 
> node list -g
> node list -g | grep karma

If you delete your local node-modules folder, you can do 
> npm install 
to recreate it from the global cache.

Folder Structure
-----------------
Under the js folder, typically there are three folders
js
|-- app
|-- lib
|-- vendor

app is the code specific to this application
lib is reuseable code
vendor is anything 3rd party

main.js is our application - it starts with require
route.js is a module - it starts with define


JavaScript window & document
----------------------------
window : everything to do with the browser
document : The context. The document object model


The Course
-----------
Course points at ubs.oortcode.com

Browsers
-------
To display developer tools on Chrome F12
To display developer tools on IE F12
To go into debug mode - hit F12, navigate to Source tab, click the enable breakpoint icon (looks like a right arrow)
Add breakpoints by clicking on line numbers of the source. You can then navigate through step by step.


Books
-----
JavaScript the good parts O'Reilly
JavaScript patterns
JavaScript enlightenment Cody Lindley

JavaScript Quirks
-----------------
JavaScript converts any statement in an if condition block to true/false.
Truthy/Falsy


Routing
-------
20 years ago the has pointed to an anchor in the html page.
Now a days the # in a SPA indicates that the url before the # will load up, then if anything is changed after the #, a full page reload will not be necessary.
eg: thezoo.org/#/animals
means load thezoo.org then look for an anchor tag/animals
The windows object has a hashchange event which allows us to step in.
window.hashchange()

JSHint
-----
http://jshint.com/ This is essentially a stylechecker/sonar check for JS.
> npm install -g jshint
The -g is for global. you can also write --global. This downloads and installs the libraries into the global cache, on Windows machine this is found under C:/Users/Georgina/AppServer/Roaming/npm
You can then test for style and syntax errors by doing
> jshint myFile.js
Theis will print out the errors/warnings
JSHint can be integrated into the build system.

Build Systems
-------------
jake
grunt v0.4.2  http://gruntjs.com/

Grunt is a node application which uses common-js. The Gruntfile.js takes a grunt runtime object.

npm install grunt-cli -g

Then navigate to the main directory in your application
> cd /c/Users/Georgina/Documents/GitHub/JavaScriptCourse/start/start
> npm install grunt --save-dev
> npm install grunt-contrib-jshint grunt-contrib-watch --save-dev
This will intall it locally 

> grunt watch
This will wait on the command line and evaluate your js after every save, highlighting any errors that are introduced.

Test Runner
------------
Karma is a test runner for JS. It controls the browser from the command line and will work with CI servers.
It is like grunt for your tests.

It uses phantom JS which is a web browser kit. It has an in memory representation of the DOM and therefore takes the window away.

> npm install karma -g
> karma init     // this will present you with a list of questions and create you a karma.conf.js
> karma start

Test files should be named classSpec.js

To run the tests do
> karma start
and observe the output


JavaScript Minimisers
---------------------
uglify and closure are javascript minimisers

Mocking The Window
------------------
Any object that has a location property, and a hash property that is a string

Html Partials
-------------
Download parts of html and put then into the DOM
Ajax which needs JQuery

Promises & Futures
------------------
https://raw.github.com/kriskowal/q/v0.9/q.js
Get the raw q.js and paste under vendor folder.
Then in the http.js we can refer to this 
{code}
define(["vendor/q"], function (Q)
{code}

On a promise you get a 'then' method

Bootstraps
----------
getbootstrap.com can be used to improve the style of the webpages. Less is used to generate the css files, written in JS.
The example in this project css/bootstrap.css is the Yeti theme.
Devised by Twitter.

SAS super awesome stylesheets.
COMPASS - completly awesome style sheets written in Ruby

http://getbootstrap.com/components/#navbar 
Navigation bars can be added to the top/bottom of the page with different styles - default (black for yeti theme) or inverse (blue for Yeti theme).
<nav class="navbar navbar-default navbar-fixed-bottom">

The top one is a good way of being able to navigate back to the home page.
The bottom one is good way of grouping actions

http://getbootstrap.com/javascript/#modals  
Clicking a button makes background go dark with a pop up box appearing

JSON
----
Javascript Object Notation
JS has an eval function to run the text you pass in using the current JS context.
This can lead to a JSON injection attack - you could manipulate the json and cause a security attack.
Eval should not be used therfore. It is to vulnerable and open to attack.
In the browser JSON.parse takes json and turns it into JS object.
JSON.stringify takes an object and turns it to JSON.

SugarFill
---------
Adds syntatic sugar to the JS 

doT
---
https://github.com/olado/doT  - templating engine.

Taking handlebar string and generates a function on the fly which you can then call with your data object. it returns the formatted string which you can then inject into your dom. 
very lightweight. No code which manipulates the dom. you give it a template and it will provide an object with the filled out template.

Integrating templates into HTML Partials.

JS Performance
--------------
jsperf.com


ul vs ol
--------
unordered list - displays as bullet points
ol ordered list - displays as numbers

Mozilla Developer Environment
-----------------------------
developer.mozilla.org is a good trouble shooting page

Two way data binding
--------------------
Binding object properties to form elements and handling change event on form elements ie update objects


Running the zoo app
-------------------
To launch the zoo
> node start
Navigate to your browser and type 
localhostL:3000 to display the home page

To run the tests do 
> karma start
test will run in the background
