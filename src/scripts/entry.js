
var pane = require('./vendor/afp-pane.js');
var main = require('./main.js');

document.addEventListener("DOMContentLoaded", function(event) {
    "use strict";
    main();
    pane();
}, false);
