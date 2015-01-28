/**
 * Created by vidaluson on 1/25/15.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
//var rename = require('gulp-rename');

gulp.task('uglify1', function () {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('jsMin'));
});

gulp.task('uglify2', function () {
    gulp.src('views/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('views/jsMin'));
});

gulp.task('minify-css1', function() {
    gulp.src('css/*.css')
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(gulp.dest('cssMin'))
});

gulp.task('minify-css2', function() {
    gulp.src('views/css/*.css')
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(gulp.dest('views/cssMin'))
});


gulp.task('default', function () {
    var watcherJS1 = gulp.watch('js/*.js', ['uglify1']);
    watcherJS1.on('change', function(event) {
        console.log('1. JS File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var watcherCSS1 = gulp.watch('css/*.css', ['minify-css1']);
    watcherCSS1.on('change', function(event) {
        console.log('1. CSS File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var watcherJS2 = gulp.watch('views/js/*.js', ['uglify2']);
    watcherJS2.on('change', function(event) {
        console.log('2. JS File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var watcherCSS2 = gulp.watch('views/css/*.css', ['minify-css2']);
    watcherCSS2.on('change', function(event) {
        console.log('2. CSS File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});