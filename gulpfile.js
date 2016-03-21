'use strict';

// Initialize process.env with .env from the project root. (Don't commit .env)
require('dotenv').config({silent: true});

var sandbox = process.env.SANDBOX || 'sandbox-01/';

var gulp       = require('gulp');
var gutil      = require('gulp-util');
var nodemon    = require('gulp-nodemon');
var clean      = require('gulp-clean');
var jshint     = require('gulp-jshint');
var jscs       = require('gulp-jscs');
var browserify = require('gulp-browserify');

/*
 * Notes:
 *
 * use '--type dist' in some gulp commands to enable distribution settings.
 *
 * For development use: $ gulp
 * For production/distribution use: $ gulp dist --type dist
 */

// Default: execute: $ gulp
gulp.task('default', ['build', 'nodemon', 'watch']);

// Server ======================================================================

gulp.task('nodemon', function() {
  nodemon({ script: sandbox + 'server.js' });
});

// Linting =====================================================================
gulp.task('lint', ['jshint', 'jscs']);

// ----- JS -----
gulp.task('jshint', function() {
  return gulp.src([sandbox + 'app/**/*.js',
                   sandbox + 'server.js',
                   sandbox + 'routes/**/*.js',
                   sandbox + 'lib/**/*.js',
                   sandbox + '!app/js/vendor/*'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function() {
  return gulp.src([sandbox + 'app/**/*.js',
                   sandbox + 'server.js',
                   sandbox + 'routes/**/*.js',
                   sandbox + 'lib/**/*.js',
                   sandbox + '!app/js/vendor/*'])
    .pipe(jscs('.jscsrc'))
    .pipe(jscs.reporter());
});

// BUILD / DIST ================================================================
gulp.task('build', [
                    'browserify-js',
                    'copy-css',
                    'copy-fonts',
                    'copy-html',
                    'copy-img'
                   ]);

gulp.task('dist', ['build'], function() {
  gutil.env.type === 'dist'
  ? console.log('\n Wow such dist!\n')
  : console.log('\n' +
              ' ============================================\n' +
              ' = You forgot to call this with --type dist =\n' +
              ' = $ gulp dist --type dist                  =\n' +
              ' ============================================\n');
});

// ----- JS -----
gulp.task('clean-js', function() {
  return gulp.src((gutil.env.type === 'dist'
      ? [sandbox + 'dist/**/*.js']
      : [sandbox + 'build/**/*.js']),
      {read: false})
    .pipe(clean({force: true}));
});

gulp.task('copy-js', ['clean-js'], function() {
  return gulp.src([sandbox + 'app/js/vendor/**/*.js'], {base: './' + sandbox + 'app'})
    .pipe(gulp.dest(gutil.env.type === 'dist' ? sandbox + 'dist/' :
                                                sandbox + 'build/'));
});

gulp.task('browserify-js', ['clean-js', 'copy-js'], function() {
  gulp.src(sandbox + 'app/js/client.js')
  .pipe(browserify({insertGlobals:true}))
  .pipe(gulp.dest(gutil.env.type === 'dist' ? sandbox + 'dist/js/' :
                                              sandbox + 'build/js/'));
});

// ----- CSS -----
gulp.task('clean-css', function() {
  return gulp.src((gutil.env.type === 'dist'
      ? [sandbox + 'dist/css/**/*.css']
      : [sandbox + 'build/css/**/*.css']),
      {read: false})
    .pipe(clean({force: true}));
});

gulp.task('copy-css', ['clean-css'], function() {
  return gulp.src([sandbox + 'app/css/**/*.css'], {base: './' + sandbox + 'app'})
    .pipe(gulp.dest(gutil.env.type === 'dist' ? sandbox + 'dist/' :
                                                sandbox + 'build/'));
});

// ----- FONTS -----
gulp.task('clean-fonts', function() {
  return gulp.src((gutil.env.type === 'dist'
      ? [sandbox + 'dist/fonts/**/*']
      : [sandbox + 'build/fonts/**/*']),
      {read: false})
    .pipe(clean({force: true}));
});

gulp.task('copy-fonts', ['clean-fonts'], function() {
  return gulp.src([sandbox + 'app/fonts/**/*'], {base: './app'})
    .pipe(gulp.dest(gutil.env.type === 'dist' ? sandbox + 'dist/' :
                                                sandbox + 'build/'));
});

// ----- HTML -----
gulp.task('clean-html', function() {
  return gulp.src((gutil.env.type === 'dist'
      ? [sandbox + 'dist/**/*.html']
      : [sandbox + 'build/**/*.html']),
      {read: false})
    .pipe(clean({force: true}));
});

gulp.task('copy-html', ['clean-html'], function() {
  return gulp.src([sandbox + 'app/**/*.html'], {base: './' + sandbox + 'app'})
    .pipe(gulp.dest(gutil.env.type === 'dist' ? sandbox + 'dist/' :
                                                sandbox + 'build/'));
});

// ----- IMG -----
gulp.task('clean-img', function() {
  return gulp.src((gutil.env.type === 'dist'
      ? [sandbox + 'dist/img/**/*']
      : [sandbox + 'build/img/**/*']),
      {read: false})
    .pipe(clean({force: true}));
});

gulp.task('copy-img', ['clean-img'], function() {
  return gulp.src([sandbox + 'app/img/**/*'], {base: './' + sandbox + 'app'})
    .pipe(gulp.dest(gutil.env.type === 'dist' ? sandbox + 'dist/' :
                                                sandbox + 'build/'));
});

// WATCH =======================================================================
gulp.task('watch', function() {
  // ----- JS -----
  gulp.watch([sandbox + 'server.js', sandbox + 'routes/**/*.js', sandbox + 'lib/**/*.js'], ['jshint', 'jscs']);
  gulp.watch([sandbox + 'app/js/**/*.js'], ['jshint', 'jscs', 'browserify-js']);

  // ----- CSS -----
  gulp.watch([sandbox + 'app/css/**/*.css'], ['copy-css']);

  // ----- CSS -----
  gulp.watch([sandbox + 'app/fonts/**/*'], ['copy-fonts']);

  // ----- HTML -----
  gulp.watch([sandbox + 'app/**/*.html'], ['copy-html']);

  // ----- IMG -----
  gulp.watch([sandbox + 'app/img/**/*'], ['copy-img']);

  console.log(' ===========================\n' +
              ' = gulp is watching you... =  (To stop watch: Ctrl + C)\n' +
              ' ===========================');
});
