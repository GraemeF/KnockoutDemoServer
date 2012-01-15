var fs = require('fs');
var _ = require('underscore');

function FileSystemEntry(root, path) {
    path = path.replace('\\', '/');
    if (path[0] == '/')
        path = path.substring(1);

    var parts = path.split('/');
    this.name = _(parts).last();
    this.root = root;
    this.path = path;
    this.uri = _.chain(parts)
        .map(function (x) {
            return encodeURIComponent(x);
        })
        .reduce(function (memo, part) {
            return memo + '/' + part;
        }, '')
        .value();

    return this;
}

FileSystemEntry.prototype.children = function (callback) {
    var parent = this;
    fs.readdir(this.root + decodeURIComponent(this.path), function (error, files) {
        if (error)
            callback(null, []);
        else
            callback(null, _(files).map(function (file) {
                return new FileSystemEntry(parent.root, parent.path + '/' + file);
            }, this));
    });
};

module.exports = FileSystemEntry;