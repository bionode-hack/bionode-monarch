#!/usr/bin/env node
var monarch=require('./')

var program = require('commander');

program
.arguments('<file>')
.option('-d, --disease_id <id>', '')
.parse(process.argv);

monarch['getDisease']()

if (typeof program.disease_id != 'undefined') {
}


