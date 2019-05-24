'use strict';

var showdown = require('showdown');
var fs = require('fs');
var path = require('path');

exports.get = function (event, context, callback) {
    var converter = new showdown.Converter();
    var contents = fs.readFileSync(`README.md`);
    var html = converter.makeHtml(contents.toString());
    var result = {
        statusCode: 200,
        body: html,
        headers: { 'content-type': 'text/html' }
    };

    callback(null, result);
};
