## 使用方式 Usage

```javascript

var gulp = require('gulp');
var gutil = require('gulp-util');

var jsonnet = require('gulp-jsonnet');

gulp.task('jsonnet', function() {
  gulp.src('./src/*.jsonnet')
    .pipe(jsonnet().on('error', gutil.log))
    .pipe(gulp.dest('./dist/'))
});

```