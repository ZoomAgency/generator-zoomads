'use strict';

module.exports = function(gulp, g, config) {

  gulp.task('copy:files', function() {
    return gulp.src(config.files.src, { dot: true, nodir: true })
      .pipe(gulp.dest(config.files.dest));
  });

  gulp.task('copy:fonts', function() {
    return gulp.src(config.fonts.src)
      .pipe(gulp.dest(config.fonts.dest));
  });

  gulp.task('copy', ['copy:files', 'copy:fonts']);

};
