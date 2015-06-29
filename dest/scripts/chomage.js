// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

document.addEventListener("DOMContentLoaded", function(event) {
  "use strict";

  queue()
    .defer(d3.json, "data/d3-formatters.json")
    .await(function(err, data) {
      if (err) console.warn("lang formatters not loaded");
      // console.log(data);
      var myFormatters = d3.locale(data);
      d3.time.format = myFormatters.timeFormat;
    });


  window.datas = [];

  var parse = d3.time.format("%B %Y"),
      once = true,
      month, noActivity, men, women, lessThan25, from25to49, moreThan50, lessThanAYear, moreThanAYear,
      newDataset = [],
      cachedKeys = [],
      cachedRange = [],
      defaults = {
        title: "",
        description: "",
        data: newDataset,
        markers: [],
        // width: 305,
        height: 120,
        full_width: true,
        // full_height: true,
        target: "#graph",
        x_accessor: "month",
        xax_format: d3.time.format('%b'),
        y_accessor: "noActivity",
        // interpolate_tension: 0.7,
        interpolate: "basis",
        rollover_text_export: {'node': ['.graph-rollover', '.graph-sumup']},
        show_secondary_x_label: false,
        x_axis: true,
        x_label: false,
        xax_start_at_min: true,
        xax_tick_length: 0,
        y_axis: false,
        show_tooltips: false,
        min_y_from_data: false,
        point_size: 6,
        transition_on_update: false,
        left: 28,
        right: 0,
        top: 0,
        bottom: 35
      };
  // get relative position of an elem in screen
  function dw_getPageOffsets(el) {
    if (typeof el === 'undefined') return;
    var sOff = dw_getScrollOffsets(), left = 0, top = 0, props;

    if ( el.getBoundingClientRect ) {
      props = el.getBoundingClientRect();
      left = props.left + sOff.x;
      top = props.top + sOff.y;
    } else { // for older browsers
      do {
        left += el.offsetLeft;
        top += el.offsetTop;
      } while ( (el = el.offsetParent) );
    }
    return { x: Math.round(left), y: Math.round(top) };
  }

  function dw_getScrollOffsets() {
    var doc = document, w = window;
    var x, y, docEl;

    if ( typeof w.pageYOffset === 'number' ) {
      x = w.pageXOffset;
      y = w.pageYOffset;
    } else {
      docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat')?
      doc.documentElement: doc.body;
      x = docEl.scrollLeft;
      y = docEl.scrollTop;
    }
    return {x:x, y:y};
  }
  function simulateClick(arrCoords) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("mouseover", true, true, window, 1, 0, 0, 0, 0,
      false, false, false, false, 0, null);

    // var cb = document.querySelector(elem);
    // console.log(cb);
    // cb.dispatchEvent(evt);
    document.elementFromPoint(arrCoords.x, arrCoords.y).dispatchEvent(evt);
  }
  // fn() for handling DOM events
  function addEventHandler(elem, eventType, handler) {
    if (elem.addEventListener)
      elem.addEventListener (eventType, handler, false);
    else if (elem.attachEvent)
      elem.attachEvent ('on' + eventType, handler);
  }
  // brew a new dataset for each call from both main selectors
  function setNewDataset(arrayOfKeys, range) {
    if (typeof arrayOfKeys === 'undefined') return;
    newDataset.length = 0;
    // console.log('in setNewDataS ', arrayOfKeys, range.length);
    if (range.length > 0) {
      // console.log("in Set new dataset 1 ", arrayOfKeys, range.length);
      _.forEach(window.datas, function(n, key) {
        if (_.inRange(key, range[0], range[1])) {// 6 mois : toDo>passer en dynamique !!
          newDataset.push(_.pick(n, arrayOfKeys));
        }
      });
    } else {
      // console.log("in Set new dataset 2 ", arrayOfKeys, range);
      _.forEach(window.datas, function(n, key) {
        newDataset.push(_.pick(n, arrayOfKeys));
        // console.log("in setNewDataset ", newDataset);
      });
    }
  }
  // fired on svg load event
  window.checkReady = function() {
    setTimeout(function() {
      var el = document.querySelector('.mg-line1-color'),
      loc = dw_getPageOffsets(el);
      // console.log(loc);
      try {
        simulateClick(loc);
      }
      catch(e) {
        console.warn("erreur ", e);
      }
      if (once) {
        console.log("ready !");
        var circle = d3.select('.mg-line-rollover-circle');
        circle.transition()
          .attr('r', 12)
          .style('opacity', 0.75)
          // .duration(800)
          // .delay(500)
          .transition()
          .attr('r', 6)
          .style('opacity', 1)
          .duration(300);
      }
      once = false;
    }, 500);
  }

  function drawGraph(lineOptions) {
    // console.info("lineOptions ", lineOptions);
    var updateSettings = _.extend({}, defaults, lineOptions);
    // console.log("new datas requested ", newDataset);
    MG.data_graphic(updateSettings);
  }
  // fn() that sets each new redraw of the graph
  function initNewGraph(arrKeys, arrRange) {
    // by caching the selector params, we ensure that the two main selectors can modify the graph layout
    if (arrKeys.length > 0) // if there's a new request, cache it
      cachedKeys = arrKeys;
    // console.log("in initNewGr ", arrKeys, cachedKeys);
    if (arrRange[0] === 'cache')
      arrRange = cachedRange;
    else if (arrRange.length > 0) // if there's a new range, cache it
      cachedRange = arrRange;
    else // else set a range to all datas
      cachedRange = [];

    // console.info("cached Keys & range ", cachedKeys, cachedRange);
    setNewDataset(cachedKeys, cachedRange);
    // console.table(newDataset);
    // console.log(JSON.stringify(newDataset));
    var options = {
      "x_accessor": cachedKeys[0],
      "y_accessor": cachedKeys[1],
      "data": newDataset
    }
    // console.log(newDataset.length);
    // call for d3 & metricsgraphics
    if (newDataset.length !== 0)
      drawGraph(options);
    else
      console.log("nop, vide ", newDataset);
  }
  // calling datas
  queue()
    .defer(d3.json, 'data/lang.json')
    .defer(d3.csv, 'data/chomage.csv')
    .await(function(err, data1, data2) {
      if (err) console.log("Error ", err);
      // console.log(err, data1.graph);
      var template = d3.select('#template').html(),
          datum = data1.graph,
          compiled_html = _.template(template, {'variable': 'data'})(datum);
      d3.select('#container').html(compiled_html);
      // console.log(data1);
      //translation
      window.AFP_translation = data1.graph;
      // store whole set of data from csv
      window.datas = data2.map(function(d) {
        return {
          'month': new Date(d.month),
          'noActivity': Math.round((+d.noActivity)*1000),
          'men': Math.round((+d.men)*1000),
          'women': Math.round((+d.women)*1000),
          'lessThan25': Math.round((+d.lessThan25)*1000),
          'from25to49': Math.round((+d.from25to49)*1000),
          'moreThan50' : Math.round((+d.moreThan50)*1000),
          'lessThanAYear': Math.round((+d.lessThanAYear)*1000),
          'moreThanAYear': Math.round((+d.moreThanAYear)*1000)
        };
      });
      // select first link and make it first selection
      var filters = d3.selectAll('.filters-link').filter(function(d, i) { return i === 1});
      console.log(filters);
      filters.attr('class', 'filters-link active');

      // range filters by time
      var aLinks = document.querySelectorAll('.filters-link'),
          aLength = aLinks.length;
      for (var i= 0; i < aLength; i++) {
        var link = aLinks[i];
        addEventHandler(link, 'click', function(e) {
          e.preventDefault();
          var $this = d3.select(this),
              selectors = $this.attr('data-filters'),
              $links = d3.selectAll('.filters-link');
          // console.log($this, selectors, $links);
          if ($this.attr('class') === 'filters-link active')
            return;
          $links.attr('class', 'filters-link');
          $this.attr('class', 'filters-link active')
          // call re-draw for graph with new params
          // console.info("selectors ", selectors, selectors.length);
          if (typeof selectors === 'string')
            initNewGraph([], [(window.datas.length + parseInt(selectors)), window.datas.length]);
          else
            initNewGraph([], []);
        });
      };

      // filters by categories
      var select = document.querySelector('.categories');
      addEventHandler(select, 'change', function(e) {
        // console.log("categories select on change ", this.value);
        initNewGraph(["month", this.value], ['cache']);
      });

      // init draw : first call of the function, it is controlled afterwards by the selectors
      // initNewGraph(['month', 'noActivity'], [window.datas.length-12, window.datas.length]);
      initNewGraph(['month', 'noActivity'], []);

      // pym callback
      // var pymChild = new pym.Child({ renderCallback: initNewGraph(['month', 'noActivity'], [window.datas.length-6, window.datas.length]) });
      var pymChild = new pym.Child({ renderCallback: initNewGraph(['month', 'noActivity'], []) });
    });

}, false);
