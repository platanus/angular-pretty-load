var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    bump = require('gulp-bump'),
    notify = require('gulp-notify'),
    git = require('gulp-git'),
    size = require('gulp-size'),
    ngannotate = require('gulp-ng-annotate'),
    npm = require('npm');

var paths = {
  src: ['./src/index.js','./src/*.js'],
  dist: ['./dist/*.js'],
};

var sourceMin = 'angular-pretty-load.min.js';

gulp.task('lint', function() {
  return gulp.src(paths.src)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build', ['lint'], function() {
  return gulp.src(paths.src)
    .pipe(ngannotate())
    .pipe(uglify())
    .pipe(concat(sourceMin))
    .pipe(size())
    .pipe(gulp.dest('dist'))
    .pipe(notify('Build finished'));
});

gulp.task('bump', function () {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type: gulp.env.type}))
    .pipe(gulp.dest('./'));
});

gulp.task('publish-git', ['bump'], function () {
  var pkg = require('./package.json');
  var msg = 'Bumps version '+pkg.version;
  gulp.src('./*.json')
    .pipe(git.add())
    .pipe(git.commit(msg));
    setTimeout(function () {
      git.tag('v'+pkg.version, msg, function(){
        git.push('origin', 'master', { args: '--tags' }, function(){});
      });
    }, 1000);
});

gulp.task('publish-npm', ['publish-git'], function() {
  npm.load({}, function(error) {
    if (error) return console.error(error);
    npm.commands.publish(['.'], function(error) {
      if (error) return console.error(error);
    });
  });
});
