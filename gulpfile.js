'use strict';

// Native dependencies
var path        = require('path');

// External dependencies
var gulp        = require('gulp');
var browserSync = require('browser-sync');
// Load all installed gulp plugins into $
var $           = require('gulp-load-plugins')();

// Constants
var SRC_DIR      = './src';
var DIST_DIR     = './dist';

// Compile less task
gulp.task('less', function () {

  // Message to be prepended to all .css files generated via less
  var message = [
    '/*-----------------------------------------------------',
    ' | This file was generated by LESS.                   |',
    ' | All modifications to it will be lost, mercilessly! |',
    ' -----------------------------------------------------*/\n\n',
  ].join('\n');

  var LESS_DIR = [
    SRC_DIR + '/**/*.less',
    '!' + SRC_DIR + '/bower_components/**/*',
  ];

  gulp.src(LESS_DIR)
    .pipe($.less())
    .on('error', $.notify.onError({
      title: 'Less compiling error',
      message: '<%= error.message %>',
      open: 'file:///<%= error.filename %>',
      sound: 'Glass',
      // Basso, Blow, Bottle, Frog, Funk, Glass, Hero,
      // Morse, Ping, Pop, Purr, Sosumi, Submarine, Tink
      icon: path.join(__dirname, 'logo.png'),
    }))
    .pipe($.minifyCss())
    .pipe($.header(message))
    // Put files at source dir in order to use them for vulcanization
    .pipe(gulp.dest(SRC_DIR))
    .pipe(gulp.dest(DIST_DIR))
    .pipe($.size({title: 'less'}));
});

// Vulcanize imports
gulp.task('vulcanize', ['less'], function () {

  gulp.src(SRC_DIR + '/elements/elements.html')
    .pipe($.vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true,
    }))
    .pipe(gulp.dest(DIST_DIR + '/elements'))
    .pipe($.size({title: 'vulcanize'}));
});

// Distribute
gulp.task('distribute', ['vulcanize'], function () {

});

// Develop task
gulp.task('develop', function () {

  var watchFiles = [
    'src/assets/css/index.css',
    'src/elements/**/*.html',
    'src/index.html',
  ];

  browserSync({
    port: 3000,
    server: {
      baseDir: './src',
    },
    files: watchFiles,
    open: true,
  });

  // Watch files for changes
  gulp.watch(['./src/**/*.less', '!./src/bower_components'], ['less']);
});
