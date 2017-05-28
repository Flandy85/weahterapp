var gulp = require('gulp');

// Plugins
// ************************************************************
<<<<<<< HEAD
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var bs = require('browser-sync').create();
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
=======
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const bs = require('browser-sync').create();
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
>>>>>>> 3d40bd5efdf6f9a4632558854315a8211e571821
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
            .pipe(babel({presets: ['es2015']}))
<<<<<<< HEAD
            .pipe(uglify({preserveComments: 'all'}))
            .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
=======
            .pipe(uglify({ preserveComments: 'all'}))
            .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()) })
>>>>>>> 3d40bd5efdf6f9a4632558854315a8211e571821
            .pipe(gulp.dest('./dist/js'));
});

gulp.task('browser-sync', ['sass'], function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('compress', function() {
    gulp.src('./js/**/*.js')
    .pipe(minify({
        ext: {
            src:''
        }
    }))
})
// ************************************************************


// Watch
// ************************************************************
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch("*.html").on("change", bs.reload);
});
// ************************************************************
