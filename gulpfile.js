/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/gulpfile.js
 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var childProcess = require('child_process');

// Source and _packaging
var libFiles = [
  'lib/_packaging/lib-header',
  'node_modules/tgi-core/dist/tgi.core.chunk.js',
  'lib/tgi-interface-bootstrap.lib.js',
  'lib/tgi-interface-bootstrap.source.js',
  'lib/tgi-interface-bootstrap-navigation.source.js',
  'lib/tgi-interface-bootstrap-panels.source.js',
  'lib/tgi-interface-bootstrap-queries.source.js',
  'lib/_packaging/lib-footer'
];

// The Spec
var specFiles = [
  'node_modules/tgi-core//lib/_packaging/spec-header',
  'lib/_packaging/spec-header',
  'node_modules/tgi-core/dist/tgi.core.spec.chunk.js',
  'lib/tgi-interface-bootstrap.spec.js',
  'lib/_packaging/spec-footer'
];

// Build Lib
gulp.task('_buildLib', function () {
  return gulp.src(libFiles)
    .pipe(concat('tgi-interface-bootstrap.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('tgi-interface-bootstrap.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Build Spec
gulp.task('_buildSpec', function () {
  return gulp.src(specFiles)
    .pipe(concat('tgi-interface-bootstrap.spec.js'))
    .pipe(gulp.dest('dist'));
});

// Build Task
gulp.task('build', ['_buildLib', '_buildSpec'], function (callback) {
  callback();
});

// Lint Lib
gulp.task('_lintLib', ['_buildLib'], function (callback) {
  return gulp.src('dist/tgi.core.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Lint Spec
gulp.task('_lintSpec', ['_buildSpec'], function (callback) {
  return gulp.src('dist/tgi.core.spec.js')
    .pipe(jshint({validthis: true, sub: true}))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Lint Task
gulp.task('lint', ['_lintLib', '_lintSpec'], function (callback) {
  callback();
});

// Test Task
gulp.task('test', ['lint'], function (callback) {
  childProcess.exec('node spec/node-runner.js', function (error, stdout, stderr) {
    console.log(stdout);
    callback(error);
  });
});

// Copy jQuery
gulp.task('copyjQuery', function () {
  return gulp.src(['node_modules/jquery/dist/**', 'node_modules/jquery/MIT-LICENSE.txt']).pipe(gulp.dest('dist/jquery'));
});

// Copy marked
gulp.task('copyMarked', function () {
  return gulp.src(['node_modules/marked/lib/marked.js', 'node_modules/marked/marked.min.js', 'node_modules/marked/LICENSE']).pipe(gulp.dest('dist/marked'));
});

// Copy Bootstrap
gulp.task('copyBootstrap', function () {
  return gulp.src(['node_modules/bootstrap/dist/**', 'node_modules/bootstrap/LICENSE']).pipe(gulp.dest('dist/bootstrap'));
});

// Copy Bootstrap Datepicker
gulp.task('copyBootstrapDatepicker', function () {
  return gulp.src(['node_modules/bootstrap-datepicker/dist/**', 'node_modules/bootstrap/LICENSE']).pipe(gulp.dest('dist/bootstrap-datepicker'));
});

// Copy Bootstrap Notify
gulp.task('copyBootstrapNotify', function () {
  return gulp.src(['node_modules/bootstrap-notify/dist/**', 'node_modules/bootstrap-notify/LICENSE']).pipe(gulp.dest('dist/bootstrap-notify'));
});

// Copy Bootstrap Notify
gulp.task('copyAnimateCSS', function () {
  return gulp.src(['node_modules/animate.css/*.css', 'node_modules/animate.css/README.md']).pipe(gulp.dest('dist/animate-css'));
});

// Copy Font Awesome
gulp.task('copyFontAwesome', function () {
  return gulp.src(['node_modules/font-awesome/css/**/*', 'node_modules/font-awesome/fonts/**/*', 'node_modules/font-awesome/README.md'], {base: 'node_modules/font-awesome'}).pipe(gulp.dest('dist/font-awesome'));
});

// Coverage Task
gulp.task('cover', function (callback) {
  childProcess.exec('istanbul cover spec/node-runner.js', function (error, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    callback(error);
  });
});

// Spec Task
gulp.task('spec', ['lint'], function (callback) {
  setTimeout(function () {
    childProcess.exec('node spec/node-make-spec-md.js', function (error, stdout, stderr) {
      console.log(stdout);
      callback(error);
    });
  }, 100); // Without this sometimes the exec runs before script is written/flushed ?
});

// Default & Travis CI Task
gulp.task('default', ['copyjQuery', 'copyMarked', 'copyBootstrap', 'copyBootstrapNotify', 'copyBootstrapDatepicker', 'copyAnimateCSS', 'copyFontAwesome', 'test']);
gulp.task('travis', ['test']);
