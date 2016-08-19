'use strict';

var path = require('path'),
    glob = require('glob'),
    _ = require('lodash'),
    streamqueue = require('streamqueue'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    reactify = require('reactify');

module.exports = function(gulp, g, config) {

  gulp.task('compile:sass', ['lint:sass'], function() {
    // Notify compilation error on BrowserSync
    if (g.browserSync.active) {
      config.sass.options.onError = onError;
    }

    // Include bower paths into compilation
    config.sass.options.includePaths = _.uniq(_.map(g.bowerDependencies, function(dependency) {
      return path.dirname(dependency);
    }));

    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src(
        g.bowerDependencies
        .concat(config.sass.src)
      )
      .pipe(g.filter(['**/*.css', '**/*.scss']))
      .pipe(g.sourcemaps.init())
      .pipe(g.if('*.scss', g.sass(config.sass.options)))
      .pipe(g.concat(config.sass.output))
      .pipe(g.autoprefixer())
      .pipe(g.combineMediaQueries())
      .pipe(g.sourcemaps.write('.'))
      .pipe(gulp.dest(config.sass.dest))
      .pipe(g.if('*.css', g.browserSync.reload({ stream: true })));
  });

  gulp.task('compile:js', ['lint:js'], function() {
    // Translate glob paths to asbolute paths
    var srcs = _.map(glob.sync(config.js.src), function(src) {
      return './' + src;
    });

    // Use CommonJS in Browsers and compile react files
    var appBrowserify = browserify(srcs, { debug: true })
      .transform(reactify);

    // Mark npm dependencies as external dependencies (Fast developing)
    _.each(g.npmDependencies, function(npmDepency) {
      if (npmDepency)
        appBrowserify.external(npmDepency.id);
    });

    // Concatenate vendor dependencies (bower, npm) and app dependencies with sourcemaps
    return streamqueue({ objectMode: true },
        gulp.src(g.bowerDependencies)
          .pipe(g.filter(['**/*.js'])),
        g.npmBrowserify
          .pipe(source(config.js.output))
          .pipe(buffer()),
        appBrowserify.bundle()
          .on('error', function(err) {
            onError(err);
            this.emit('end');
          })
          .pipe(source(config.js.output))
          .pipe(buffer())
      )
      .pipe(g.sourcemaps.init({ loadMaps: true }))
      .pipe(g.concat(config.js.output))
      .pipe(g.sourcemaps.write('.'))
      .pipe(gulp.dest(config.js.dest));
  });

  gulp.task('compile:images', function() {
    return gulp.src(config.images.src)
      .pipe(g.cached('compile:images'))
      .pipe(gulp.dest(config.images.dest))
      .pipe(g.webp())
      .pipe(gulp.dest(config.images.dest))
      .pipe(g.browserSync.reload({ stream: true }));
  });

  gulp.task('compile:fonts', function() {
    return gulp.src(
        g.bowerDependencies
        .concat(config.fonts.src)
      )
      .pipe(g.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe(g.cached('compile:fonts'))
      .pipe(gulp.dest(config.fonts.dest));
  });

  gulp.task('compile', ['compile:sass', 'compile:js', 'compile:images', 'compile:fonts']);

  function onError(err) {
    var message = 'Error: ' + err.message + ' on line ' + err.line + ' in ' + err.file;
    g.util.log(g.util.colors.red(message));
    g.browserSync.notifyError(message);
  }

};
