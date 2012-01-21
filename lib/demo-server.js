var args = require('optimist').argv;
var FileSystemEntry = require('./fileSystem');
var express = require('express');

var server = express.createServer(/*express.logger()*/);
server.enable("jsonp callback");

var rootPath = args.root + '\\';
root = new FileSystemEntry(rootPath, '');

server.get('/*', function (req, res) {
    setTimeout(function () {
        var path = decodeURI(req.params[0]);
        console.log(path);
        var dir = new FileSystemEntry(rootPath, path);
        dir.children(function (error, files) {
            if (error)
                res.end(404);
            else
                res.json(files);
        });
    }, args.delay);
});

server.listen(1337);