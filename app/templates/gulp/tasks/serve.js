'use strict';

var runSequence = require('run-sequence');

module.exports = function(gulp, g, config) {

  gulp.task('serve', ['lint', 'compile'], function() {
    g.browserSync(config.browserSync.dev);

    gulp.watch(config.watch.html.src, function() {
      runSequence('lint:html', 'reload');
    });
    gulp.watch(config.watch.images.src, ['compile:images']);
    gulp.watch(config.watch.styles.src, ['compile:sass']);
    gulp.watch(config.watch.scripts.src, function() {
      runSequence('compile:js', 'reload');
    });
    gulp.watch(config.watch.vendor.src, function() {
      g.loadVendorDependencies();
      runSequence('compile', 'reload');
    });
  });

  gulp.task('serve:dist', ['dist'], function() {
    g.browserSync(config.browserSync.prod);
  });

  gulp.task('reload', function() {
    if (g.browserSync.active)
      g.browserSync.reload();
  });

};
