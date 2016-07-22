# har-online

## Note: this is currently broken as RawGit does not allow anonymous gists anymore. Will fix this soon.

A command-line tool to view HAR files at [Jan Odvarko's HAR viewer](http://www.softwareishard.com/har/viewer/).

![](http://g.recordit.co/aA7qwJ4835.gif)

## Installation

```sh
$ npm install -g har-online
```

## Usage

`har` accepts UTF-8 formatted HAR through standard input.

```sh
# Read from file
$ har < filename.har

# Read from a remote URL
$ wget -qO- http://www.janodvarko.cz/har/viewer/examples/inline-scripts-block.har | har
```

`har` will output a URL that can be used to visualize the contents of the supplied input.

## How it works

Files are modified to add padding (JSONP) and uploaded as anonymous, private gists over TLS.
[RawGit](https://rawgit.com/) links are used to supply the correct MIME types.

## TODO

* Support arbitrary HAR viewer instances (config file)
