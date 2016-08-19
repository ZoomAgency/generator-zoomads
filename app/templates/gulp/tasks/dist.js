'use strict';

var runSequence = require('run-sequence');

module.exports = function(gulp, g, config) {

  gulp.task('dist', function(cb) {
    runSequence('clean', ['lint', 'compile'], ['optimize', 'copy'], 'release', cb);
  });

};
