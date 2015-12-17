// document.addEventListener("DOMContentLoaded", function(event) {
var queue = require('./queue.min.js');

module.exports = function() {
    "use strict";
    var pane = document.querySelector('.afp-pane'),
    paneClass = pane.className,
    warn = document.querySelector('.not-supported'),
    mandatoryList = ['queryselector', 'fontface', 'boxsizing'];

    /**
    * [testfeatures description] use modernizr builtin test tool to test if the client browser is suitable for the widget
    * @param  {[type]}   list     [description] array of tested features
    * @param  {Function} callback [description]
    * @return {[type]}            [description]
    */
    function testfeatures(list, callback) {
    list.forEach(function(el, i) {
      if (!Modernizr[el]) {
        callback(el + ' not implemented', el);
        return;
      }
      if (i === (list.length - 1) && Modernizr[list[(list.length - 1)]])
        callback(null, true);
    });
    }

    /**
    * [manageInfosPanel description] CTA buttons for displaying info panels
    * @return void
    */
    function manageInfosPanel() {
    var infoButton = document.querySelector('.click-info'),
      closeButton = document.querySelector('.click-close');

    infoButton.addEventListener('click', function(e) {
      e.preventDefault();
      var containerHeight = document.getElementById('container').offsetHeight;
      pane.style.minHeight = containerHeight + 'px';
      pane.style.display = 'block';
      pane.className += ' slide-down';
      pane.style.top = 0;
    }, false);

    closeButton.addEventListener('click', function(e) {
      e.preventDefault();
      var containerHeight = document.getElementById('container').offsetHeight;
      pane.style.minHeight = containerHeight + 'px';
      pane.className += ' slide-up';
      pane.style.top = '-1000px';
      pane.className = paneClass;
    }, false);
    }
    // test du tableau des mandatory features
    queue()
    .defer(testfeatures, mandatoryList)
    .await(function(err, result) {
      if (err) console.log("Error ", err);
      if (result === true) {
        manageInfosPanel();
      } else {
        // build warning panel
        var containerHeight = document.getElementById('container').offsetHeight;
        warn.style.minHeight = containerHeight + 'px';
        warn.style.display = 'block';
        // Velocity(warn, { opacity: 1, top:0 }, { duration: 800 });
        warn.className += ' slide-down';
        warn.style.top = 0;
      }
    });

    // }, false);


};
