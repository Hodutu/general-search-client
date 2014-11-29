'use strict';

var request = require('request');

var host = 'http://www.generalfil.es/';
var url = host + 'files-a/';
var options = '/?filter=_Video_';


var getFile = function(link, cb){
  request(host + link, function(err, response, body) {
    try {
      var finalLink = JSON.parse(body).link;
      cb(null, finalLink);
    } catch (e) {
      cb(new Error('Error on response parsing for ' + host+link));
    }
  });
};

var gse = function(title, cb) {
  title = title.replace(/[^(\w)]+/gi, '-').toLowerCase();
  request(url+title+options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var links = body.match(/gf_ShowDownloadLink\([\w',?=\/&]+/gi);
      links = links.map(function(link){
        return link.split(',').pop().replace(/'/gi, '');
      });

      getFile(links[0], function(error, result){
        console.log(error, result);
      });
    }
  });
};


gse('American Dad! S01E01', function(err, result) {

});

//GENERALFIL.ES
