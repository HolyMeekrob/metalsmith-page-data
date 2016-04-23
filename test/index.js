'use strict';

const test = require('tape');
const pageData = require('../lib/index');

const getFiles = () => {
	return {
		'file.html': {
			prop: 'file one'
		},
		'file.md': {
			prop: 'file two'
		},
		'file.js': {
			prop: 'file three'
		}
	};
};

test('no configuration', (assert) => {
	let err = undefined;
	const done = (e) => {
		err = e;
	}

	pageData()(getFiles(), undefined, done);
	assert.notEqual(err, undefined, 'done was called with an error');
	assert.end();
});

test('configuration is missing pattern', (assert) => {
	let err = undefined;
	const done = (e) => {
		err = e;
	}

	const config = [{
		data: {
			prop: 'new val'
		}
	}];

	pageData(config)(getFiles(), undefined, done);
	assert.notEqual(err, undefined, 'done was called with an error');
	assert.end();
});

test('configuration is missing data', (assert) => {
	const unmodifiedFiles = getFiles();
	const modifiedFiles = getFiles();

	let doneCalled = false;
	const done = () => {
		doneCalled = true;
	};

	const config = [{
		pattern: '*',
		override: true
	}];

	pageData(config)(modifiedFiles, undefined, done);

	assert.deepEqual(modifiedFiles, unmodifiedFiles, 'files are unchanged');
	assert.equal(doneCalled, true, 'done was called');
	assert.end();
});

test('pattern filters some files', (assert) => {
	const unmodifiedFiles = getFiles();
	const modifiedFiles = getFiles();

	let doneCalled = false;
	const done = () => {
		doneCalled = true;
	};

	const newVal = 'new val';

	const config = [{
		pattern: '*.html',
		data: {
			otherProp: 'new val',
		},
		override: false
	}];

	pageData(config)(modifiedFiles, undefined, done);

	assert.equal(modifiedFiles['file.html'].otherProp, newVal,
		'new value was inserted into the included file\'s metadata');
	Object.keys(modifiedFiles)
		.filter((path) => path !== 'file.html')
		.forEach((path) => {
			assert.deepEqual(modifiedFiles[path], unmodifiedFiles[path],
				'omitted files have no changes to their metadata');
		});
	assert.equal(doneCalled, true, 'done was called');
	assert.end();
});

