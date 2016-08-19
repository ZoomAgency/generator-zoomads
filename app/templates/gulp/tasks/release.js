'use strict';

module.exports = function(gulp, g, config) {

  gulp.task('release:zip', function() {
    return gulp.src(config.zip.src)
      .pipe(g.zip(config.zip.output))
      .pipe(gulp.dest(config.zip.dest));
  });

  gulp.task('release', ['release:zip']);

};
