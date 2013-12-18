/*
repeater
    find elements with data-repeat
    get HTML for elements
    call doT to create function
    call function with data
    put HTML back in DOM
*/


define(["vendor/doT"], function (doT) {
    
    //Safe key to use for arbitrary property on DOM
    var _key = "ubs-" + Date.now();

    function compileTemplate(templateElement) {
        templateElement.removeAttribute("data-repeat");
        var html = templateElement.outerHTML; /* outer is all the html tags including its own */
        return doT.template(html);
    }

    function renderElements(value, template, dataNodes, parent, nextSibling ){
         if (value && value.length) {

            var builder = []; //so it acts like stringbuilder

            for (var i = 0; i < value.length; i++) {
                builder.push(template(value[i])); //push strings into the array
            }

            var div = document.createElement("div"); //create a temp element as a working space
            div.innerHTML = builder.join("\n");
            
            

            while (div.firstChild) { //has it got a first child, if so move it over , repeat until no first children
                dataNodes.push(div.firstChild); //JS arrays are designed to be used as stacks
                parent.insertBefore(div.firstChild, nextSibling); //parent is the ul. There is no insertAfter
            }
        }
    }
    
    function renderTemplate(templateElement, value) {
        var parent = templateElement.parentNode;
        var template = compileTemplate(templateElement);
        var dataNodes = []; //nodes generated from data
        
        renderElements(value, template, dataNodes, parent, templateElement);
        parent.removeChild(templateElement); /* goes from being hidden by css then removing it */
        
        return{
            parent: parent, 
            template: template,
            dataNodes: dataNodes
        };

    }
    
    function updateFromCache(cacheItem, data){
        var length = cacheItem.dataNodes.length;
        var nextSibling = length ? cacheItem.dataNodes[length - 1].nextSibling : undefined;
        for(var i = length -1; i >= 0; i--){
            console.log(cacheItem.dataNodes[i]);
            cacheItem.parent.removeChild(cacheItem.dataNodes[i]);
           
        };
        cacheItem.dataNodes = []; //reset the datanode in that cacheItem
        renderElements(data, cacheItem.template, cacheItem.dataNodes, cacheItem.parent, nextSibling);
    }

    function renderRepeaters(element, data) {
        var cache = {};
        for (var property in data) {
            if (data.hasOwnProperty(property)) {
                cache[property] = [];
                var value = data[property];
                var selector = "[data-repeat='" + property + "']";
                var templates = element.querySelectorAll(selector); //querySelector returns the first one , querySelectorAll finds the whole lot

                for (var i = 0; i < templates.length; i++) {
                 var cacheItem =   renderTemplate(templates[i], value);
                    cache[property].push(cacheItem);
                }
            }
        }
        element[_key] = cache;

    }
    
    function update(element, data){
        var cache = element[_key];
        if(!cache) { return ; } // need braces to prevent ASI Automatic Semicolon insertion
    
        for(var property in data){
            if(data.hasOwnProperty(property)){
                var cacheItem = cache[property];
                if(cacheItem && cacheItem.length){ //check it is there
                    cacheItem.forEach(function(item){
                       updateFromCache(item, data[property]); 
                    });
                }
            }
        }
    }

    return {
        repeaters: renderRepeaters, /* expose our renderRepeaters function and call it repeaters */
        update: update //export the update function
    };
});