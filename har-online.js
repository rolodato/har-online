var GitHubApi = require("github");
var github = new GitHubApi({
    version: "3.0.0",
    protocol: "https"
});
var url = require("url");

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
            // Use rawgit instead of direct GitHub link
            // see https://stackoverflow.com/questions/17341122/link-and-execute-external-javascript-file-hosted-on-github
            var rawgitUrl = url.parse(gist);
            rawgitUrl.host = "cdn.rawgit.com";
            var result = url.format(rawgitUrl);
            return cb(null, viewerUrl(result));
        }
    });
}

module.exports = {
    harUrl: harUrl
};
