'use strict';

var es = require('event-stream');

module.exports = function(gulp, g, config) {

  var browserSyncReporter = function(lint) {
    return es.map(function(file, cb) {
      if (file[lint].success) return cb(null, file);

      var err;
      if (file[lint].results) {
        err = file[lint].results[0].error;
      } else if (file[lint].messages) {
        err = file[lint].messages[0].error;
      } else if (file[lint].issues) {
        var issue = file[lint].issues[0];
        err = {
          reason: issue.message,
          line: issue.line
        };
      }
      err.reason = err.reason || err.message;
      console.log(err);

      var message = 'Error: ' + err.reason + ' on line ' + err.line + ' in ' + file.path;
      g.browserSync.notifyError(message);
      g.browserSync.ignoreReload();

      cb(null, file);
    });
  };

  gulp.task('jshint', function() {
    return gulp.src(config.js.src)
      .pipe(g.cached('lint:js'))
      .pipe(g.jshint())
      .pipe(g.jshint.reporter('jshint-stylish'))
      .pipe(g.if(g.browserSync.active, browserSyncReporter('jshint')))
      .pipe(g.if(!g.browserSync.active, g.jshint.reporter('fail')));
  });

  gulp.task('jscs', function() {
    return gulp.src(config.js.src)
      .pipe(g.cached('lint:js'))
      .pipe(g.jscs())
      .pipe(g.jscs.reporter())
      .pipe(g.if(g.browserSync.active, browserSyncReporter('jscs')))
      .pipe(g.if(!g.browserSync.active, g.jscs.reporter('fail')));
  });

  gulp.task('lint:js', ['jshint', 'jscs']);

  gulp.task('lint:sass', function() {
    return gulp.src(config.sass.src)
      .pipe(g.cached('lint:styles'))
      .pipe(g.scssLint())
      .pipe(g.if(g.browserSync.active, browserSyncReporter('scsslint')))
      .pipe(g.if(!g.browserSync.active, g.scssLint.failReporter()));
  });

  gulp.task('lint:css', function() {
    return gulp.src(config.css.src)
      .pipe(g.cached('lint:styles'))
      .pipe(g.csslint('.cssrc'))
      .pipe(g.csslint.reporter())
      .pipe(g.if(g.browserSync.active, browserSyncReporter('csslint')))
      .pipe(g.if(!g.browserSync.active, g.csslint.failReporter()));
  });

  gulp.task('lint:styles', ['lint:sass', 'lint:css']);

  gulp.task('lint:html', function() {
    return gulp.src(config.html.src)
      .pipe(g.cached('lint:html'))
      .pipe(g.htmlhint())
      .pipe(g.htmlhint.reporter())
      .pipe(g.if(g.browserSync.active, browserSyncReporter('htmlhint')))
      .pipe(g.if(!g.browserSync.active, g.htmlhint.failReporter()));
  });

  gulp.task('lint', ['lint:js', 'lint:styles', 'lint:html']);

};
