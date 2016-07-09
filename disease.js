var url = require('url');
var request = require('request');
var JSONStream = require('JSONStream');
var split = require('split2');
var through = require('through2');

var urlDiseaseEndpoint = 'https://monarchinitiative.org/disease/OMIM:127750.json';
var urlDiseaseListOmimList = 'https://raw.githubusercontent.com/monarch-initiative/disease-miner/master/omim-id-name.tbl';

// var filter = function (object, encoding, next) {
//   this.push(JSON.stringify(object)); // sends the object downstream
//   next();
// };

// var myFilter = through.obj(filter);

{
  id: DECIPHER:14
  name: Prader-Willi Syndrome (Type 1)
}

request(urlString)
  // .pipe(split())
  // .pipe(JSONStream.parse())
  // .pipe(myFilter)
  .pipe(process.stdout);
