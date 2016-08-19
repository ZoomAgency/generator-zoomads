'use strict';

var generators = require('yeoman-generator'),
    questions = require('./questions');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.ads = [];
    this.option('coffee');
  },
  prompting: function() {
    var self = this,
        prompts = questions,
        done = this.async();

    return this.prompt(prompts).then(function(props) {
      this.ads.push(props);

    }.bind(this)).then(function() {
      askForMoreBanners(self);

    });

    function askForMoreBanners(self) {
      var needMoreAds = {
        type: 'confirm',
        name: 'moreAds',
        message: '¿Necesitas crear un nuevo formato?'
      };

      return self.prompt([needMoreAds]).then(function(props) {
        if (props.moreAds) {
          self.prompting();
        } else {
          done();
        }
      }.bind(self));
    }
  },
  configuring: function() {
    //
  },
  writing: function() {
    var self = this,
        adsPropsArray = this.ads;

    adsPropsArray.forEach(function(adProps, index) {
      console.log(adProps);
      this._copyTplWithContext(
        'test.txt',
        'test-' + index + '.txt',
        adProps
      );
    }.bind(self));

    // this._copyTplWithContext(
    //   this.templatePath('test.txt'),
    //   this.destinationPath('test.txt'),
    //   this.props
    // );

    // this._copyTplWithContext(
    //   this.templatePath(this.props.platform),
    //   this.destinationPath(),
    //   this.props
    // );
  },
  _copyTplWithContext: function(templatePath, destinationPath, context) {
    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(destinationPath),
      context
    );
  }
});
