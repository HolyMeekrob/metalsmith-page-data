'use strict';

const minimatch = require('minimatch');

const missingProperty = (prop, obj) =>
	Object.keys(obj).indexOf(prop) === -1;

const doesFileMatch = (filename) => (elem) => {
	const pattern = missingProperty('pattern', elem)
		? '*'
		: elem.pattern;
	return minimatch(filename, pattern);
};

const updateFile = (fileData) => (option) => {
	const override = option.override === true;
	Object.keys(option.data).forEach((key) => {
		if (override || missingProperty(key, fileData)) {
			fileData[key] = option.data[key];
		}
	})
};

const getPlugin = (config) => {
	return (files, ms, done) => {
		try {
			Object.keys(files).forEach((filename) => {
				config
					.filter(doesFileMatch(filename))
					.forEach(updateFile(files[filename]))
			});
			done();
		}
		catch (e) {
			done(e);
		}
	};
};

module.exports = getPlugin;
