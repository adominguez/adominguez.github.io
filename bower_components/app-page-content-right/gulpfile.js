/* ======================================================================================================
 * Plugins
 * ======================================================================================================*/
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require('gulp-notify'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync').create(),
  imagemin = require('gulp-imagemin'),
  clean = require('gulp-rimraf'),
  bower = require('gulp-bower'),
  fs = require('fs'),
  replace = require('gulp-replace'),
  bower = require('gulp-bower'),
  superstatic = require('superstatic');



/* ======================================================================================================
 * task about styles
 * ======================================================================================================*/
gulp.task('styles', function () {
  gulp.src("./*.scss")
    //.pipe(sourcemaps.init())
    .pipe(sass()).on('error', notify.onError(function (error) {
      return 'Error al compilar sass.\n Detalles en la consola.\n' + error;
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    //.pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

/* ======================================================================================================
 * Task for insert styles in app-page-content-right-styles.html
 * ======================================================================================================*/
gulp.task('styles-replace', ['styles'], function () {
  return gulp.src('./app-page-content-right-styles.html')
    .pipe(replace(/<style>[^>]*<\/style>/, function (s) {
      var style = fs.readFileSync('./dist/css/app-page-content-right.css', 'utf8');
      return '<style>\n' + style + '\n</style>';
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

/* ======================================================================================================
 * Task for server component
 * ======================================================================================================*/
gulp.task('serve', ['styles-replace', 'styles', 'watch'], function () {
  var mw = [
    function (req, res, next) {
      if ((req.url.indexOf('/bower_components') !== 0) && (req.url !== '/') && (req.url !== '/demo/index.html') && (req.url !== '/app-page-content-right.html') && (req.url !== '/app-page-content-right.js') && (req.url !== '/app-page-content-right-styles.html')) {
        req.url = 'bower_components' + req.url;
      }
      return superstatic({
        config: {
          root: 'bower_components',
          clean: true
        }
      })(req, res, next);
    },
  ];
  browserSync.init({
    injectChanges: true,
    files: ['./*.{html, scss}', './demo/index.html', './app-page-content-right.js', './dist/css/app-page-content-right.css'],
    notify: true,
    server: {
      baseDir: "./",
      directory: false,
      middleware: mw
    }
  });
});

/* ======================================================================================================
 * watch changes in files app-page-content-right.scss and app-page-content-right.html
 * ======================================================================================================*/
gulp.task('watch', function () {
  gulp.watch('./app-page-content-right.html', ['styles-replace']); // Vigila cambios en el html
  gulp.watch('./dist/css/app-page-content-right.css', ['styles-replace']); // Vigila cambios en el html
  gulp.watch('./*.scss', ['styles']); // Vigila cambios en los estilos
});

/* ======================================================================================================
 * Task for install bower
 * ======================================================================================================*/
gulp.task('bower', ['bower-remove', 'bower-cache-clean'], function () {
  return bower();
});

/* ======================================================================================================
 * task for remove package bower
 * ======================================================================================================*/
gulp.task('bower-remove', function () {
  return gulp.src(['./bower_components'], {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

/* ======================================================================================================
 * Task for clean cache in bower
 * ======================================================================================================*/
gulp.task('bower-cache-clean', function () {
  return bower({
    cmd: 'cache clean'
  });
});


/* ======================================================================================================
 * Default Task
 * ======================================================================================================*/
gulp.task('default', ['bower', 'styles', 'browser-sync', 'watch']);
