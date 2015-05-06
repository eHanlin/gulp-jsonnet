var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var Jsonnet = require('jsonnet');

var jsonnet = new Jsonnet();

var PluginError = gutil.PluginError;


module.exports = function (opt) {

	function transform(file, enc, cb) {
		if (file.isNull()) return cb(null, file);
		if (file.isStream()) return cb(new PluginError('gulp-jsonnet', 'Streaming not supported'));

		var dest = replaceExtension(file.path);
		var code = file.contents.toString('utf8');
		var result;
		
		try {
			jsonnet.eval(code);	
		} catch(ex) {
			return cb(new PluginError('gulp-jsonnet', ex));
		}

		file.contents = new Buffer(result);
		file.path = dest;
		cb(null, file);
	}

	return through.obj(transform);
};

