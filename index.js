#!/usr/bin/env node
// Richard Wen
// rwen.dev@gmail.com

var fs = require('fs');
var path = require('path');

var cmd = process.argv[2];

// (help) Command line for help
if (cmd == '-h' || cmd == 'help' || cmd == '--help') {
  console.log('\
  Usage:\n\
  \tpg-testdb-template <path>\n\n\
  Arguments:\n\
  \tpath\tfile path to save template to (default: ./pg-testdb-template.js)\
  ');
} else {

  // (read) Read template file to copy
  var from = path.resolve(__dirname, 'pg-testdb-template.js');
  var read = fs.createReadStream(from);
  read.on('error', function(err) {
    console.error(err);
  });

  // (copy) Copy template file to directory
  var to = process.argv[3] || './pg-testdb-template.js';
  var write = fs.createWriteStream(to);
  write.on('error', function(err) {
    console.error(err);
  });
  write.on('close', function(err) {
    console.log('Template for npm package "pg-testdb" created at: ' + to);
  });
  read.pipe(write);
}
