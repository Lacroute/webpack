graph
  
  style(scoped).
    :scope {
      width: 100%;
      height: 430px;
    }
    .axis {
      shape-rendering: crispEdges;
    }

    .x.axis line,
    .x.axis path {
      fill: none;
      stroke: #000;
    }

    .y.axis line,
    .y.axis path {
      fill: none;
      stroke: #000;
    }

  script.
    var self = this;
    var svg,chart;
    var d3 = require('d3');
    var Tooltip = require('tether-tooltip');
    var margin = {
      top: 40,
      right: 20,
      bottom: 40,
      left: 30
    };

    var x = '';
    var xScale = d3.scale.linear();
    var xDomain;
    var xAxis = d3.svg.axis().orient('bottom');

    var y = '';
    var yScale = d3.scale.linear();
    var yDomain;
    var yAxis = d3.svg.axis().orient('left');

    this.on('mount',function() {
      svg = d3.select(self.root);
      svg.attr('version','1.1').attr('xmlns','http://www.w3.org/2000/svg').attr('xmlns:xlink','http://www.w3.org/1999/xlink');
      chart = svg.append('g').attr('class','chart');

      chart.append('g').attr('class','x axis');
      chart.append('g').attr('class','y axis');

      updateElements();
      resize();
    });

    this.on('update',function() {
      var xDomain = d3.extent(self.opts.data,function(d) {
        return parseFloat(d[x]);
      });
      console.log('xDomain is now ',xDomain);
      xScale.domain(xDomain);

      var yDomain = d3.extent(self.opts.data,function(d) {
        return parseFloat(d[y]);
      });
      console.log('yDomain is now ',yDomain);
      yScale.domain(yDomain);
    });

    function updateElements() {
      /*self.circles = chart.selectAll('.point').data(opts.data);
      self.circles.enter().append('circle').attr('class','point tooltip');
      self.circles.exit().remove();
      self.circles.each(function(d) {
        var content = "<div class='note'>"+d.imdbrating+"<sup> / 10</sup>"+"</div>";
        content += "<div class='details'>";
        content += "<div class='film'>"+d.film+"</div>";
        content += "<div class='real'>"+d.realisateur+"</div>";
        content += "<div class='prix'>"+d.prix+" ("+d.annee+")"+"</div>";
        content +=  "<div class='votes'>"+format(parseInt(d.imdbvotes))+" "+window.lang.content.legendvotes+"</div>";
        content += "</div>";
        // content += "<br />";
        // content += d.pays+" - "+d.genre;

        var tooltip = new Tooltip({
          target: this,
          content: content,
          position: 'left middle'
        });
      }).attr('data-film',function(d) {return d.film;});*/
    }

    window.Dispatcher.on('resize',resize);

    function resize() {
      var width = parseInt(svg.style('width'),10) - margin.left - margin.right;
      var height = parseInt(svg.style('height'),10) - margin.top - margin.bottom;
      console.log('Largeur : ',width,' | Hauteur : ',height);

      chart.attr('width',width).attr('height',height).attr('transform','translate('+margin.left+','+margin.top+')');

      xScale.range([0,width]);
      yScale.range([height,0]);

      xAxis.scale(xScale);
      yAxis.scale(yScale);

      svg.select('.x.axis').attr('transform','translate(0,'+(height+margin.top)+')');
      svg.select('.y.axis').call(yAxis.tickSize(-width));
    }