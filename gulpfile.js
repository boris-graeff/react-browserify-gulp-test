var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    streamify = require('gulp-streamify'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber');

var paths = {
    dist : 'dist/',
    js : 'src/js/**/*.js',
    style : ['src/style/main.less'],
    mainJs : 'src/js/main.js'
};

/* JS */

gulp.task('js', function() {
    browserify({
        entries: [paths.mainJs],
        transform: [reactify]
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(paths.dist));
});

/* STYLE */

gulp.task('style', function() {
   return gulp.src(paths.style)
       .pipe(plumber())
       .pipe(less())
       .pipe(autoprefixer({
           browsers: ['last 2 versions']
       }))
       .pipe(minifyCSS({processImport: false}))
       .pipe(rename('app.css'))
       .pipe(gulp.dest(paths.dist));
});

/* WATCH */

gulp.task('watch', function() {
    gulp.watch(paths.style, ['style']);
    gulp.watch(paths.js, ['js']);
});

/* CONNECT */

gulp.task('connect', function() {
    connect.server();
});

/* COPY */

gulp.task('copy', function() {
    gulp.src('medias/**/*')
        .pipe(gulp.dest(paths.dist+'medias/'));
});

/* DEFAULT */

gulp.task('default', ['copy', 'watch', 'style', 'js', 'connect']);
