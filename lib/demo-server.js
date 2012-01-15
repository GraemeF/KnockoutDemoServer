var args = require('optimist').argv;
var FileSystemEntry = require('./fileSystem');
var app = require('express').createServer();

var rootPath = args.root + '\\';
root = new FileSystemEntry(rootPath, '');

root.children(function (error, result) {
    console.log(root.path, result);
});

app.get('/*', function (req, res) {
    var dir = new FileSystemEntry(rootPath, req.url);
    dir.children(function (error, files) {
        res.json(files);
        res.end();
    });
});

app.listen(3000);