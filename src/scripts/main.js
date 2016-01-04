
var queue = require('./vendor/queue.min.js');
var pym = require('./vendor/pym.min.js');
var fetchJSONFile = require('./vendor/fetchJson');

//Tags
var riot = require('riot');
var todo = require('./todo.tag');

//Initialisation de Google Analytics
var googleAnalytics = require('./vendor/googleAnalytics')('UA-64253904-2');

module.exports = function() {
    "use strict";

	//Chargement des données de traduction
	queue()
		.defer(fetchJSONFile, "data/lang.json")
		.await(ready);

	function ready(error, lang) {

		//Envoyer l'information de chargement à Google Analytics
		ga('send', 'event', 'Infographie', 'loaded', lang.id, {
			nonInteraction: true
		});
		ga('send', 'event', 'Language', 'loaded', lang.language, {
			nonInteraction: true
		});

        riot.mount(todo, {title:"Ma todolist", items:[{title: "Premier item"},{title: "Deuxième item"}]});
	}

	//Initialisation de PymJS
	var pymChild = new pym.Child();
};
