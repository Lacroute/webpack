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
          var containerHeight = document.getElementById('container').offsetHeight;
          pane.style.height = containerHeight + 'px';
          pane.style.display = 'block';
          Velocity(pane, { opacity: 1, top:0 }, { duration: 800, complete: function() {
            setTimeout(function() {
              window.scroll(0,0)
            }, 500);
          }
        });
        }, false);

        closeButton.addEventListener('click', function(e) {
          e.preventDefault();
          var containerHeight = document.getElementById('container').offsetHeight;
          pane.style.height = containerHeight + 'px';
          Velocity(pane, { opacity: 0, top:-1000 }, { duration: 800, complete: function() {
            pane.style.display = 'none';
          }
        });
        }, false);
      }, 250);

    });

}, false);
