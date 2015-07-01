#!/usr/bin/env node

var harUrl = require("./har-online.js").harUrl;
var Promise = require("bluebird");
var validUrl = require("valid-url");
var fs = Promise.promisifyAll(require("fs"));
var request = Promise.promisify(require("request"));

function success(res) {
    console.log(res);
    process.exit(0);
}

function failure() {
    console.error("Invalid URL or HAR file!");
    process.exit(1);
}

function missingFile(err) {
    console.error("File doesn't exist: " + err.path);
    process.exit(1);
}

function tryJson(str) {
    try {
        return JSON.parse(str);
    } catch(e) {
        return false;
    }
}

function harFromInput(input) {
    var json = tryJson(input);
    if (validUrl.isUri(input)) {
        return request(input).spread(function (res, body) {
            return harUrl(JSON.parse(body));
        });
    } else if (json) {
        return harUrl(json);
    } else {
        return fs.readFileAsync(input).then(function (file) {
            return harUrl(JSON.parse(file));
        }, missingFile).then(success, failure);
    }
}

var stdinSize = fs.fstatSync(process.stdin.fd).size;
var input;
if (stdinSize > 0) {
    input = fs.readSync(process.stdin.fd, stdinSize)[0];
} else {
    input = process.argv[process.argv.length - 1];
}
harFromInput(input).then(success, failure);
