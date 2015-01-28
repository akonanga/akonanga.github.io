/**
 * Created by vidaluson on 1/25/15.
 */
var gulp = require('gulp');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');

gulp.task('default', function () {
    gulp.src('fnmportfolioCRP/js/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});