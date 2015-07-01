# har-online

A command-line tool to view HAR files at [Jan Odvarko's HAR viewer](http://www.softwareishard.com/har/viewer/).

## Installation

```sh
```

## Usage

```sh
# Read from stdin
$ har < local.har

# Read from a file
$ har local.har

# Read from a remote URL
$ har http://www.janodvarko.cz/har/viewer/examples/inline-scripts-block.harp
```

All commands will output a URL that can be used to visualize the contents of the supplied HAR file.

## How it works

Files are modified to add padding (JSONP) and uploaded as anonymous, private gists over TLS.

## TODO

* Upload multiple HAR files at once
* Support arbitrary HAR viewer instances (config file)
