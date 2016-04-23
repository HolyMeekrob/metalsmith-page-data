'use strict';

const minimatch = require('minimatch');

const doesFileMatch = (filename) => (option) => {
	// console.log(`${filename} - ${option.pattern} - ${minimatch(filename, option.pattern)}`);
	return minimatch(filename, option.pattern);
}

const updateFile = (fileData) => (option) => {
	const override = option.override === true;
	Object.keys(option.data).forEach((key) => {
		if (override || Object.keys(fileData).indexOf(key) === -1) {
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
