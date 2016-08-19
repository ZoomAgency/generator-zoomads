'use strict';

var generators = require('yeoman-generator'),
    questions = require('./questions');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('coffee');
  },
  prompting: function() {
    var prompts = questions;

    return this.prompt(prompts).then(function(props) {
      this.props = props;

    }.bind(this));
  },
  configuring: function() {
    //
  },
  writing: function() {
    this._copyTplWithContext(
      this.templatePath('test.txt'),
      this.destinationPath('test.txt'),
      this.props
    );

    this._copyTplWithContext(
      this.templatePath(this.props.platform),
      this.destinationPath(),
      this.props
    );
  },
  _copyTplWithContext: function(templatePath, destinationPath, context) {
    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(destinationPath),
      context
    );
  }
});
