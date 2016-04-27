# metalsmith-page-data ![Build status](https://travis-ci.org/HolyMeekrob/metalsmith-page-data.svg?branch=master)

A Metalsmith plugin to insert page metadata programatically. This is useful if
you always want to add the same metadata to a group of files that can be
matched using [glob expressions][globUrl]. Instead of having to manually
enter that metadata into each page (and the risks of forgetting to do so or
making typos), you can use this plugin.

## Installation
``` bash
npm install --save-dev metalsmith-page-data
```

## Usage
```js
var Metalsmith = require('metalsmith');
var pageData = require('metalsmith-page-data');

Metalsmith
	.use(pageData(config))
```

## Config
The config argument should be an array of objects, each of which has the
following properties:
- pattern (*optional*) (*default: '**') - a glob expression used to determine
which files will be included. Internally it uses [minimatch][minimatchUrl],
so please see its documentation for details. If not set, it will default
to matching all files.

- data: (*required*) - an object whose property name and values will be merged
into the page's metadata.

- override (*optional*) (*default: false*)- a boolean value that determines whether existing page
metadata will be overridden for any property it it has already been set. Any
value that isn't explicity ```true``` will be treated as false, including
"truthy" javascript values.

## Example
``` js
// Set all blog posts to use a common layout
var config = [{
	pattern: 'blog/**/*.html',
	data: {
		layout: 'blog.html'
	},
	override: true
]};

Metalsmith
	.use(pageData(config);
```
[minimatchUrl]: https://www.npmjs.com/package/minimatch
[globUrl]: https://en.wikipedia.org/wiki/Glob_%28programming%29
