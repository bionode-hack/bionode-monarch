#!/usr/bin/env node

var program = require('commander');

program
.arguments('<file>')
.option('-i, --id <id>', '')
.parse(process.argv);

