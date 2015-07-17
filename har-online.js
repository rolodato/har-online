var GitHubApi = require("github");

var github = new GitHubApi({
    version: "3.0.0",
    protocol: "https"
});

function harViewerJsonp(harObject) {
    return "onInputData(" + JSON.stringify(harObject) + ");";
}

function viewerUrl(fileUrl) {
    return "http://www.softwareishard.com/har/viewer?inputUrl=" + fileUrl;
}

function harUrl(harObject, cb) {
    // Gists require a filename, so we use a timestamp
    var filename = Date.now().toString() + ".js";
    var gistOptions = {
        public: false,
        files: {}
    };
    gistOptions.files[filename] = {
        content: harViewerJsonp(harObject)
    };
    github.gists.create(gistOptions, function (err, res) {
        if (err) {
            return cb(err);
        } else {
            var gist = res.files[filename].raw_url;
            return cb(null, viewerUrl(gist));
        }
    });
}

module.exports = {
    harUrl: harUrl
};
