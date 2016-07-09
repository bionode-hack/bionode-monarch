var url = require('url');
var request = require('request');
var JSONStream = require('JSONStream');
var split = require('split2');
var through = require('through2');

var urlObject = {
  protocol: 'http',
  host: 'www.ebi.ac.uk',
  pathname: '/eva/webservices/rest/v1/meta/studies/list',
  search: '?species=hsapiens_grch37'
};

var urlString = url.format(urlObject);

var filter = function (object, encoding, next) {
  this.push(JSON.stringify(object)); // sends the object downstream
  next();
};

var myFilter = through.obj(filter);

request(urlString)
  .pipe(split())
  .pipe(JSONStream.parse())
  .pipe(myFilter)
  .pipe(process.stdout);
