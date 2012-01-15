var fs = require('fs');
var _ = require('underscore');

function FileSystemEntry(path) {
    this.name = _(path.split('\\')).last();
    this.path = path;
    return this;
}

FileSystemEntry.prototype.children = function (callback) {
    var parent = this;
    fs.readdir(this.path, function (error, files) {
        if (error)
            callback(error);

        callback(null, _(files).map(function (file) {
            return new FileSystemEntry(parent.path + '\\' + file);
        }, this));
    });
};

module.exports = FileSystemEntry;