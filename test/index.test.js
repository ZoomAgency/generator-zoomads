/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var assert  = require('yeoman-assert');
var helpers = require('yeoman-test');

var getDefaultFilesForFormatPath = function(appPath) {
  return [
    appPath + '/app/',
    appPath + '/gulp/config.js',
    appPath + '/gulp/tasks/clean.js',
    appPath + '/gulp/tasks/compile.js',
    appPath + '/gulp/tasks/copy.js',
    appPath + '/gulp/tasks/dist.js',
    appPath + '/gulp/tasks/lint.js',
    appPath + '/gulp/tasks/optimize.js',
    appPath + '/gulp/tasks/release.js',
    appPath + '/gulp/tasks/serve.js',
    appPath + '/gulpfile.js',
    appPath + '/package.json',
    appPath + '/test.txt',
    appPath + '/zoom.json'
  ];
};

describe('zoomads generator', function() {
  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, '../temp'), function(err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('zoomads:app', [
        '../app'
      ]);

      done();
    }.bind(this));
  });

  it('the generator can be required without throwing', function() {
    // not testing the actual run of generators yet
    this.app = require('../app');
  });

  it('creates expected files for billboard format', function(done) {
    var formatPath = 'app/doubleclick/billboard-1';

    helpers.mockPrompt(this.app, {
      platform: 'doubleclick',
      category: 'rising-stars',
      format: 'billboard',
      moreAds: false
    });

    this.app.options['skip-install'] = true;

    this.app.run(function() {
      assert.file(getDefaultFilesForFormatPath(formatPath));
      done();
    });
  });

  it('creates expected files for filmstrip format', function(done) {
    var formatPath = 'app/doubleclick/filmstrip-1';

    helpers.mockPrompt(this.app, {
      platform: 'doubleclick',
      category: 'rising-stars',
      format: 'filmstrip',
      dimensions: '300x600d',
      moreAds: false
    });

    this.app.options['skip-install'] = true;

    this.app.run(function() {
      assert.file(getDefaultFilesForFormatPath(formatPath));
      done();
    });
  });
});
