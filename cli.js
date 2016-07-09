#!/usr/bin/env node
var monarch=require('./')

var program = require('commander');

program
.arguments('<file>')
.option('-d, --disease_id <id>', '')
.option('-g, --gene_id <id>', '')
.parse(process.argv);


if (typeof program.disease_id != 'undefined') {
    //monarch.disease['getPhenotypesByDiseaseId'](program.disease_id)
    monarch.disease['getGenesByDiseaseId'](program.disease_id)
} else if (typeof program.gene_id != 'undefined') {
    monarch.gene['getPhenotypesByGeneId'](program.gene_id)
}


