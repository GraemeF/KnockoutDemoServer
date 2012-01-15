var args = require('optimist').argv;
var FileSystemEntry = require('./fileSystem');
var app = require('express').createServer();

root = new FileSystemEntry(args.root);

root.children(function (error, result) {
    console.log(root.path, result);
});

app.get('/*', function(req, res){
  console.log('hello world', req);
    var dir = new FileSystemEntry(args.root + req.url);
    dir.children(function(error, files){
        res.json(files);
        res.end();
    });
});

app.listen(3000);