/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

function classname(str) {
  return str.replace(/-/g, ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return letter.toUpperCase();
  }).replace(/\s+/g, '');
}

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(
      'Welcome to the smashing ' + chalk.red('generator-things:shell-template') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'templateName',
      message: 'Your template name?'
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    var tpl = this.props;

    this.fs.copyTpl(
      this.templatePath('_template.js'),
      this.destinationPath('templates/' + this.props.templateName + '.js'),
      tpl
    );

    this.fs.copy(
      this.templatePath('_icon.png'),
      this.destinationPath('templates/' + this.props.templateName + '.png'),
      tpl
    );
  }
};
