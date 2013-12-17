var fs = require("fs"),
    async = require("async");

function isJson(file) {
  return /json$/.test(file);
}

function loadRecord(file, callback) {
  fs.readFile(file, "utf8", function(err, text) {
    var item;
    if (!err) {
      item = JSON.parse(text);
    }
    callback(err, item);
  });
}

function all(type, callback) {
  var dir = __dirname + "/data/" + type;
  fs.readdir(dir, function (err, files) {
    if (err) {
      callback(err);
      return;
    }
    files = files.filter(isJson).map(function(file) {return dir + "/" + file});
    if (files.length === 0) {
      callback(null, []);
      return;
    }
    async.map(files, loadRecord, function(err, data){
      callback(err, data);
    })
  });
}

function get(type, id, callback) {
  var file = __dirname + "/data/" + type + "/" + id + ".json";
  loadRecord(file, callback);
}

module.exports = {
  all: all
};