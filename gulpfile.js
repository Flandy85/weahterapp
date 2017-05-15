var gulp = require('gulp');

// Plugins
// ************************************************************
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
// var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var bs = require('browser-sync').create();
var gutil = require('gulp-util');
// ************************************************************


// Tasks
// ************************************************************
gulp.task('sass', function() {
    return gulp.src('./src/scss/style.scss')
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(gulp.dest('./dist/css'))
            .pipe(bs.reload({ stream: true }));
});

gulp.task('scripts', function() {
    return gulp.src('./src/js/**/*.js')
            .pipe(concat('bundle.js'))
            // .pipe(uglify({ preserveComments: 'all'}))
            .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
            .pipe(gulp.dest('./dist/js'));
});

gulp.task('browser-sync', ['sass'], function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});
// ************************************************************


// Watch
// ************************************************************
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch("*.html").on("change", bs.reload);
});
// ************************************************************
