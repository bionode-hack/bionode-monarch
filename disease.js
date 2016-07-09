var url = require('url');
var request = require('request');
var JSONStream = require('JSONStream');
var split = require('split2');
var through = require('through2');
var hh = require('highland');

var urlDiseaseListOmimList = 'https://raw.githubusercontent.com/monarch-initiative/disease-miner/master/omim-id-name.tbl';

var urlSolrBuilder = function (diseaseId) {
  return 'https://solr.monarchinitiative.org/solr/golr/select?defType=edismax&qt=standard&indent=on&wt=json&rows=100000&start=0&fl=subject,subject_label,relation,relation_label,object,object_label,evidence,evidence_label,source,is_defined_by,qualifier&facet=true&facet.mincount=1&facet.sort=count&json.nl=arrarr&facet.limit=25&facet.method=enum&csv.encapsulator=&csv.separator=%09&csv.header=true&csv.mv.separator=%7C&fq=subject_closure:%22' + diseaseId + '%22&fq=object_category:%22phenotype%22&fq=subject_category:%22disease%22&facet.field=subject_taxon_closure_label&facet.field=object_taxon_closure_label&q=*:*';
};

var omimOnlyFilterFn = function (object, encoding, next) {
  if (object.startsWith('OMIM')) {
    this.push(object);
  }
  next();
};

var omimOnlyFilter = through.obj(omimOnlyFilterFn);

var diseaseFilterFn = function (object, encoding, next) {
  var line = object.split('\t');
  this.push(JSON.stringify({
    id: line[0],
    name: line[1]
  })); // sends the object downstream
  next();
};


var diseaseFilter = through.obj(diseaseFilterFn);

var idToSearchFn = function (object, encoding, next) {
  request(urlSolrBuilder(JSON.parse(object).id), (err, res, body) => {
    this.push(body);
    next();
  });
};

var idToSearch = through.obj(idToSearchFn);

hh(
    request(urlDiseaseListOmimList)
    .pipe(split())
    .pipe(omimOnlyFilter)
  )
  .take(10)
  .pipe(diseaseFilter)
  .pipe(idToSearch)
  .pipe(process.stdout);
