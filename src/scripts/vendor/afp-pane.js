document.addEventListener("DOMContentLoaded", function(event) {
  "use strict";
  var pane = document.querySelector('.afp-pane'),
      templt = document.getElementById('pane').innerHTML,
      warn = document.getElementById('notsupported').innerHTML,
      mandatoryList = ['queryselector', 'fontface', 'boxsizing'];

  function testfeatures(list, callback) {
    list.forEach(function(el, i) {
      if (!Modernizr[el]) {
        callback(el + ' not implemented', el);
        return;
      } if (i === (list.length-1) && Modernizr[list[(list.length-1)]])
        callback(null, true);
    });
  }
  function buildInfosPanel() {
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
  }
  // test du tableau des mandatory features
  queue()
    .defer(testfeatures, mandatoryList)
    .await(function(err, result) {
      if (err) console.log("Error ", err);
      if (result === true) {
        buildInfosPanel();
      } else {
        // build warning panel
        queue()
          .defer(d3.json, 'data/lang.json')
          .await(function(err, datum) {
            var compiled_err = _.template(warn, {'variable': 'data'})(datum.warn);
            pane.innerHTML = compiled_err;
            setTimeout(function() {
              var containerHeight = document.getElementById('container').offsetHeight;
              pane.style.height = containerHeight + 'px';
              pane.style.display = 'block';
              Velocity(pane, { opacity: 1, top:0 }, { duration: 800 });
            }, 1500);
          });
      }
    });

}, false);
