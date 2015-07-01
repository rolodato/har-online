# har-online

A command-line tool to view HAR files at [Jan Odvarko's HAR viewer](http://www.softwareishard.com/har/viewer/).

![](http://g.recordit.co/aA7qwJ4835.gif)

## Installation

```sh
$ npm install -g har-online
```

## Usage

```sh
# Read from stdin
$ har < filename.har

# Read from a file
$ har filename.har

# Read from a remote URL
$ har http://www.janodvarko.cz/har/viewer/examples/inline-scripts-block.har
```

All commands will output a URL that can be used to visualize the contents of the supplied HAR file.

## How it works

Files are modified to add padding (JSONP) and uploaded as anonymous, private gists over TLS.

## TODO

* Upload multiple HAR files at once
* Support arbitrary HAR viewer instances (config file)
