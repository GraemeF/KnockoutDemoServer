var args = require('optimist').argv;
var FileSystemEntry = require('./fileSystem');
var express = require('express');

var app = express.createServer(express.logger());

var rootPath = args.root + '\\';
root = new FileSystemEntry(rootPath, '');

app.get('/*', function (req, res) {
    var dir = new FileSystemEntry(rootPath, decodeURI(req.url));
    dir.children(function (error, files) {
        if(error)
            res.end(404);
        else
            res.json(files);
    });
});

app.listen(3000);