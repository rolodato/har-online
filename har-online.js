var GitHubApi = require("github");
var Promise = require("bluebird");

var github = new GitHubApi({
    version: "3.0.0",
    protocol: "https"
});

function harViewerJsonp(harObject) {
    return "onInputData(" + JSON.stringify(harObject) + ");";
}

function harUrl(harObject) {
    // Gists require a filename, so we use a timestamp
    var filename = Date.now().toString();
    var gistOptions = {
        public: false,
        files: {}
    };
    gistOptions.files[filename] = {
        content: harViewerJsonp(harObject)
    };
    var createGist = Promise.promisify(github.gists.create);
    return createGist(gistOptions).then(function (res) {
        var gist = res.files[filename].raw_url;
        return 'http://www.softwareishard.com/har/viewer?inputUrl=' + gist;
    });
}

module.exports = {
    harUrl: harUrl
};
