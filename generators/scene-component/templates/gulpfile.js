'use strict';
 
var gulp = require("gulp");
var license = require('gulp-header-license');
var fs = require('fs');
 
gulp.task('license', function () {
    var year = (new Date()).getFullYear();
    gulp.src('./src/**/*.js')
            .pipe(license('/*\n * Copyright © ${year}, HatioLab Inc. All rightss reserved.\n */\n', {year: year}))
            .pipe(gulp.dest('./src/'));
    gulp.src('./test/**/*.js')
            .pipe(license('/*\n * Copyright © ${year}, HatioLab Inc. All rightss reserved.\n */\n', {year: year}))
            .pipe(gulp.dest('./test/'));
    gulp.src('./test/**/*.html')
            .pipe(license('<!--\n@license\nCopyright © ${year}, HatioLab Inc. All rightss reserved.\n-->', {year: year}))
            .pipe(gulp.dest('./test/'));
    gulp.src('./demo/**/*.html')
            .pipe(license('<!--\n@license\nCopyright © ${year}, HatioLab Inc. All rightss reserved.\n-->', {year: year}))
            .pipe(gulp.dest('./demo/'));
});
