// Importar modulos
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var cssnano = require('cssnano');
var autoprefixer = require('autoprefixer');
var merge = require('merge-stream');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync').create();


gulp.task('server', function () {
  browserSync.init({
    //server: './',
    proxy: '127.0.0.1:8000'
  });
});

gulp.task('build-css', function () {
  var libCSS  = gulp.src('src/libs/**/*.css');
  var mainCSS = gulp.src('src/sass/*.scss')
                .pipe(sass().on('error', sass.logError));

  return merge(libCSS, mainCSS)
         .pipe(concat('app.min.css'))
         .pipe(sourcemaps.init())
         .pipe(postcss([autoprefixer(), cssnano()]))
         .pipe(sourcemaps.write('./'))
         .pipe(gulp.dest('dist/assets/css/'))
         .pipe(browserSync.stream());
});

gulp.task('build-js', function () {
  return browserify('src/js/main.js')
    .transform("babelify", {presets: ['es2015']})
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify({preserveComments: 'license'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/assets/js/'))
    .pipe(browserSync.stream());
});

gulp.task('image-optimization', function () {
  return gulp.src('dist/assets/img/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/img/'));
});

gulp.task('default', ['server', 'build', 'image-optimization'], function () {
  gulp.watch('src/**/*.{css,scss}', ['build-css']);
  gulp.watch('src/**/*.js', ['build-js']);
  gulp.watch('**/*.html').on('change', browserSync.reload);
});

gulp.task('build', ['build-css', 'build-js']);
