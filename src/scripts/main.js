"use strict";
document.addEventListener("DOMContentLoaded", function(event) {

	//Chargement des données de traduction
	queue()
		.defer(fetchJSONFile, "data/lang.json")
		.await(ready);

	function ready(error, lang) {

		//Envoyer l'information de chargement à Google Analytics
		ga('send', 'event', 'Infographie', 'loaded', lang.id + '-' + lang.language, {
			nonInteraction: true
		});
	}

	//Initialisation de PymJS
	var pymChild = new pym.Child();
});

/************
Google Analytics
************/

(function(i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r;
	i[r] = i[r] || function() {
		(i[r].q = i[r].q || []).push(arguments)
	}, i[r].l = 1 * new Date();
	a = s.createElement(o),
		m = s.getElementsByTagName(o)[0];
	a.async = 1;
	a.src = g;
	m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-64253904-2', 'auto');
ga('set', 'anonymizeIp', true);
ga('set', 'forceSSL', true);
ga('send', 'pageview', location.pathname);