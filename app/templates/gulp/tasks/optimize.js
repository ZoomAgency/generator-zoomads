'use strict';

module.exports = function(gulp, g, config) {

  gulp.task('optimize:images', function() {
    return gulp.src(config.images.src)
      .pipe(g.size({ title: 'Size before optimize images' }))
      .pipe(g.imagemin(config.options))
      .pipe(gulp.dest(config.images.dest))
      .pipe(g.size({ title: 'Size after optimize images' }));
  });

  gulp.task('optimize:css', function() {
    return gulp.src(config.css.src)
      .pipe(g.size({ title: 'Size before optimize css' }))
      .pipe(g.csso())
      .pipe(gulp.dest(config.css.dest))
      .pipe(g.size({ title: 'Size after optimize css' }));
  });

  gulp.task('optimize:js', function() {
    return gulp.src(config.js.src)
      .pipe(g.size({ title: 'Size before optimize js' }))
      .pipe(g.stripDebug())
      .pipe(g.uglify())
      .pipe(gulp.dest(config.js.dest))
      .pipe(g.size({ title: 'Size after optimize js' }));
  });

  gulp.task('optimize:html', function() {
    return gulp.src(config.html.src)
      .pipe(g.size({ title: 'Size before optimize html' }))
      .pipe(g.htmlmin(config.html.options))
      .pipe(gulp.dest(config.html.dest))
      .pipe(g.size({ title: 'Size after optimize html' }));
  });

  gulp.task('optimize', ['optimize:images', 'optimize:css', 'optimize:js', 'optimize:html']);

};
