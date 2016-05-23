var queue = require('./vendor/queue.min.js');
var pym = require('./vendor/pym.min.js');
var fetchJSONFile = require('./vendor/fetchJson');
var debounce = require('debounce');

//Initialisation de PymJS
var pymChild = new pym.Child({polling: 500});

//Tags
var riot = require('riot');
var graph = require('./graph.tag');
window.Dispatcher = riot.observable();

//Gestion du responsive
window.onresize = debounce(resize,25);
function resize() {
	window.Dispatcher.trigger('resize');
	pymChild.sendHeight();
}

//Initialisation de Google Analytics
var googleAnalytics = require('./vendor/googleAnalytics')('UA-64253904-2');

module.exports = function() {
    "use strict";

	//Chargement des données de traduction
	queue()
		.defer(fetchJSONFile, "data/lang.json")
		.await(ready);

	function ready(error, lang) {

		var d3 = require('d3');
		window.lang = lang;
		window.locale = d3.locale(lang.locale);

		//Envoyer l'information de chargement à Google Analytics
		ga('send', 'event', 'Infographie', 'loaded', lang.id, {
			nonInteraction: true
		});
		ga('send', 'event', 'Language', 'loaded', lang.language, {
			nonInteraction: true
		});

		var sharedMixins = {
			init: function() {
				console.log(this)
				this.on('updated', function() { console.log(this.root.localName + ' updated !') });
			},
			getOpts: function() {
				return this.opts;
			},
			setOpts: function(opts, update) {
				this.opts = opts;
				if(!update) this.update();
				return this;
			},
			getQueryParams: function(qs) {
		      qs = qs.split('+').join(' ');
		      var params = {},
		          tokens,
		          re = /[?&]?([^=]+)=([^&]*)/g;
		      while (tokens = re.exec(qs)) {
		        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
		      }
		      return params;
		    },
		    trackEvent: function(category, action, label, value) {
		    	ga('send', 'event', category, action, label, value);
		    }
		}
		riot.mixin(sharedMixins);

        riot.mount(graph, {
        	data: []
        });

        pymChild.sendHeight();
	}	
};
