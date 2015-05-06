var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var Jsonnet = require('jsonnet');

var jsonnet = new Jsonnet();

var PluginError = gutil.PluginError;


module.exports = function () {

	function transform(file, enc, cb) {
		if (file.isNull()) return cb(null, file);
		if (file.isStream()) return cb(new PluginError('gulp-jsonnet', 'Streaming not supported'));

		var dest = gutil.replaceExtension(file.path, '.json');
		var code = file.contents.toString('utf8');
		var result;
		
		try {
			result = jsonnet.eval(code);	
		} catch(ex) {
			return cb(new PluginError('gulp-jsonnet', ex));
		}

		file.path = dest;
		file.contents = new Buffer(JSON.stringify(result));
		cb(null, file);
	}

	return through.obj(transform);
};

