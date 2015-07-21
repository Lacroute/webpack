document.addEventListener("DOMContentLoaded", function(event) {
  "use strict";
  var pane = document.querySelector('.afp-pane'),
      templt = document.getElementById('pane').innerHTML;

  queue()
    .defer(d3.json, 'data/lang.json')
    .await(function(err, data) {
      if (err) console.log("Error ", err);
      var compiled = _.template(templt, {'variable': 'data'})(data.info);

      pane.innerHTML = compiled;
      setTimeout(function() {
        var infoButton = document.querySelector('.click-info'),
            closeButton = document.querySelector('.click-close');

        infoButton.addEventListener('click', function(e) {
          e.preventDefault();
          Velocity(pane, { opacity: 1, top:0 }, { duration: 800 });
        }, false);

        closeButton.addEventListener('click', function(e) {
          e.preventDefault();
          Velocity(pane, { opacity: 0, top:-1000 }, { duration: 800 });
        }, false);
      }, 100);

    });

}, false);
