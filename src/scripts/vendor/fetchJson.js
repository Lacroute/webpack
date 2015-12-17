/**
* [fetchJSONFile description] ajax fn() with queue.js callback
* @param  {[type]}   path     [description] uri to json source
* @param  {Function} callback [description] handler in queue.js
* @return void
*/
module.exports = function(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
            var data = JSON.parse(httpRequest.responseText);
            if (callback) callback(null, data);
          }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
};
