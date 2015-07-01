#!/usr/bin/env node
var harUrl = require("./har-online.js").harUrl;

function tryJson(str) {
    try {
        return JSON.parse(str);
    } catch(e) {
        return false;
    }
}

function harFromInput(input, cb) {
    var json = tryJson(input);
    if (json) {
        return harUrl(json, cb);
    } else {
        return cb("Invalid HAR file");
    }
}

process.stdin.setEncoding("utf-8");
var input = [];
process.stdin.on("readable", function () {
    var chunk = process.stdin.read();
    if (chunk != null) {
        input.push(chunk);
    }
});
process.stdin.on("end", function () {
    harFromInput(input.join(""), function (err, url) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            console.log(url);
            process.exit(0);
        }
    });
});

