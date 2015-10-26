/**
 * The MIT License (MIT)
 * Copyright (c) 2015 Fabrica de Aplicativos S/A
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 */
// Native dependencies
var path         = require('path');
var fs           = require('fs');
var EventEmitter = require('events');

// External dependencies
var gulp        = require('gulp-help')(require('gulp'));
var del         = require('del');

// Load all installed gulp plugins into $
var $           = require('gulp-load-plugins')();

// Internal dependencies
var config      = require('./tasks/config');
var aux         = require('./tasks/auxiliary');

require('./tasks/basic')(gulp, $);
require('./tasks/build')(gulp, $);
require('./tasks/setup')(gulp, $);
require('./tasks/develop')(gulp, $);
require('./tasks/linting')(gulp, $);

// do not show at help list
gulp.task('default', false, ['help'], function () {
    console.log('\nRun ' + $.util.colors.white.bgGreen('gulp develop') + ' if you are lost :)\n');
});

var header = require('gulp-header');

var license = [
    '/**',
    ' * The MIT License (MIT)',
    ' * Copyright (c) 2015 Fabrica de Aplicativos S/A',
    ' * Permission is hereby granted, free of charge, to any person obtaining a',
    ' * copy of this software and associated documentation files (the "Software"),',
    ' * to deal in the Software without restriction, including without limitation',
    ' * the rights to use, copy, modify, merge, publish, distribute, sublicense,', 
    ' * and/or sell copies of the Software, and to permit persons to whom the', 
    ' * Software is furnished to do so, subject to the following conditions:',
    ' * The above copyright notice and this permission notice shall be included',
    ' * in all copies or substantial portions of the Software.',
    ' * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,',
    ' * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES',
    ' * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND ',
    ' * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT', 
    ' * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, ',
    ' * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,',
    ' * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER ',
    ' * DEALINGS IN THE SOFTWARE.',  
    ' */',
  ''].join('\n');

gulp.task('mitify', function () {
   
   gulp.src('./**/*.js')
   .pipe(header(license))
   .pipe(gulp.dest('./'));
 
});