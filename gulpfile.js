var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglifyjs'),
    minify = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename');

gulp.task('concatjs', function(){
    gulp.src('public/sources/scripts/**/*.js')
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('sass', function(){
    gulp.src('public/sources/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss('bundle.css'))
        .pipe(minify({keepBreaks: true}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/css'));

});

gulp.task('imagemin', function(){
    gulp.src('public/sources/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'));
});

gulp.task('default', function(){
    gulp.watch('public/sources/scss/**/*.scss', ['sass']);
    gulp.watch('public/sources/scripts/**/*.js', ['concatjs']);
    gulp.watch('public/sources/images/*', ['imagemin']);
})