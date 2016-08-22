'use strict';

var _ = require('lodash'),
    requireDir = require('require-dir'),
    StreamCache = require('stream-cache'),
    browserSync = require('browser-sync'),
    mainBowerFiles = require('main-bower-files'),
    browserify = require('browserify'),
    npmResolve = require('resolve'),
    gulp = require('gulp'),
    g = require('gulp-load-plugins')(),
    config = require('./gulp/config'),
    projectConfig = require('./zoom.json');

// BrowserSync monkey patch to ignore reload
browserSync.canReload = true;
browserSync.forceReload = false;

browserSync.ignoreReload = function() {
  browserSync.canReload = false;
};

var reload = browserSync.reload;
browserSync.reload = function(arg) {
  var willReload = browserSync.forceReload || browserSync.canReload;

  browserSync.canReload = true;
  browserSync.forceReload = false;

  if (willReload) return reload.call(this, arg);

  if (arg && arg.stream === true)
    return g.util.noop();
};

browserSync.notifyError = function(message) {
  return browserSync.notify('<span style="color: red;">' + message + '</span>');
};

// Added as gulp plugin
g.browserSync = browserSync;
g.loadVendorDependencies = function() {
  g.bowerDependencies = mainBowerFiles();
  g.npmDependencies = _.map(npmDependencieIds(), function(id) {
    return { id: id, path: npmResolve.sync(id) };
  });
  var npmBrowserify = browserify({ debug: true });
  _.each(g.npmDependencies, function(npmDepency) {
    if (npmDepency)
      npmBrowserify.require(npmDepency.path, { expose: npmDepency.id });
  });
  var cacheStream = new StreamCache();
  npmBrowserify.bundle().pipe(cacheStream);
  g.npmBrowserify = cacheStream;
};

// Load vendor dependencies (bower, npm, etc.) for gulp use
g.loadVendorDependencies();

// Load tasks from the `tasks` directory
var tasks = requireDir('./gulp/tasks');
_.forOwn(tasks, function(task, name) {
  var taskConfig = config[name] || config;
  task(gulp, g, taskConfig, projectConfig);
});

gulp.task('default', ['serve']);

function npmDependencieIds() {
  // read bower.json and get dependencies' package ids
  var npmManifest = {};
  try {
    npmManifest = require('./package.json');
  } catch (e) {
    // does not have a package.json manifest
  }

  return _.keys(npmManifest.dependencies) || [];
}
