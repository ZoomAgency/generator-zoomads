'use strict';

var del = require('del');

module.exports = function(gulp, g, config) {

  gulp.task('clean', function(cb) {
    del(config.src, cb);
  });

};
