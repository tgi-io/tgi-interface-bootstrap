/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/gulpfile.js
 */

const gulp = require('gulp');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const childProcess = require('child_process');

// Source and _packaging
const libFiles = [
  'lib/tgi-interface-bootstrap.lib.js',
  'lib/tgi-interface-bootstrap.source.js',
  'lib/tgi-interface-bootstrap-navigation.source.js',
  'lib/tgi-interface-bootstrap-panels.source.js',
  'lib/tgi-interface-bootstrap-queries.source.js'
];
const libPackaging = ['lib/_packaging/lib-header']
  .concat(['node_modules/tgi-core/dist/tgi.core.chunk.js'])
  .concat(libFiles)
  .concat(['lib/_packaging/lib-footer']);

const specFiles = [
  'node_modules/tgi-core//lib/_packaging/spec-header',
  'lib/_packaging/spec-header',
  'node_modules/tgi-core/dist/tgi.core.spec.chunk.js',
  'lib/tgi-interface-bootstrap.spec.js',
  'lib/_packaging/spec-footer'
];

function _buildLib() {
  return gulp.src(libPackaging)
    .pipe(concat('tgi-interface-bootstrap.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('tgi-interface-bootstrap.min.js'))
    .pipe(terser())
    .pipe(gulp.dest('dist'));
}

function _buildLibChunk() {
  return gulp.src(libFiles)
    .pipe(concat('tgi.interface.bootstrap.chunk.js'))
    .pipe(gulp.dest('dist'));
}

function _buildSpec() {
  return gulp.src(specFiles)
    .pipe(concat('tgi-interface-bootstrap.spec.js'))
    .pipe(gulp.dest('dist'));
}

const build = gulp.series(
  gulp.parallel(_buildLibChunk, _buildLib, _buildSpec)
);

function _lintLib() {
  return gulp.src('dist/tgi.core.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
}

function _lintSpec() {
  return gulp.src('dist/tgi.core.spec.js')
    .pipe(jshint({ validthis: true, sub: true }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
}

const lint = gulp.series(
  build,
  gulp.parallel(_lintLib, _lintSpec)
);

function test(cb) {
  childProcess.exec('node spec/node-runner.js', function (error, stdout, stderr) {
    console.log(stdout);
    cb(error);
  });
}

test.displayName = 'test';

gulp.task('test', gulp.series(lint, test));

gulp.task('copyjQuery', function () {
  return gulp.src(['node_modules/jquery/dist/**', 'node_modules/jquery/MIT-LICENSE.txt'])
    .pipe(gulp.dest('dist/jquery'));
});

gulp.task('copyMarked', function () {
  return gulp.src([
    'node_modules/marked/lib/marked.js',
    'node_modules/marked/marked.min.js',
    'node_modules/marked/LICENSE'
  ]).pipe(gulp.dest('dist/marked'));
});

gulp.task('copyBootstrap', function () {
  return gulp.src([
    'node_modules/bootstrap/dist/**',
    'node_modules/bootstrap/LICENSE'
  ]).pipe(gulp.dest('dist/bootstrap'));
});

gulp.task('copyBootstrapDatepicker', function () {
  return gulp.src([
    'node_modules/bootstrap-datepicker/dist/**',
    'node_modules/bootstrap/LICENSE'
  ]).pipe(gulp.dest('dist/bootstrap-datepicker'));
});

gulp.task('copyBootstrapNotify', function () {
  return gulp.src([
    'node_modules/bootstrap-notify/dist/**',
    'node_modules/bootstrap-notify/LICENSE'
  ]).pipe(gulp.dest('dist/bootstrap-notify'));
});

gulp.task('copyAnimateCSS', function () {
  return gulp.src([
    'node_modules/animate.css/*.css',
    'node_modules/animate.css/README.md'
  ]).pipe(gulp.dest('dist/animate-css'));
});

gulp.task('copyFontAwesome', function () {
  return gulp.src([
    'node_modules/font-awesome/css/**/*',
    'node_modules/font-awesome/fonts/**/*',
    'node_modules/font-awesome/README.md'
  ], { base: 'node_modules/font-awesome' })
    .pipe(gulp.dest('dist/font-awesome'));
});

function cover(cb) {
  childProcess.exec('istanbul cover spec/node-runner.js', function (error, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    cb(error);
  });
}

gulp.task('cover', cover);

function spec(cb) {
  setTimeout(function () {
    childProcess.exec('node spec/node-make-spec-md.js', function (error, stdout, stderr) {
      console.log(stdout);
      cb(error);
    });
  }, 100);
}

gulp.task('spec', gulp.series(lint, spec));

gulp.task('build', build);
gulp.task('lint', lint);

gulp.task('default', gulp.series(
  gulp.parallel('copyjQuery', 'copyMarked', 'copyBootstrap', 'copyBootstrapNotify', 'copyBootstrapDatepicker', 'copyAnimateCSS', 'copyFontAwesome'),
  'test'
));
gulp.task('travis', gulp.series('test'));
