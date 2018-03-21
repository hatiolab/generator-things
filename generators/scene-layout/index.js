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
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the smashing ' + chalk.red('generator-things:scene-layout') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'layoutName',
      message: 'Your scene-layout name?',
      default: this.appname.replace('things-scene-', '') + '-layout'
    }];

    return this.prompt(prompts).then(props => {
      let layoutName = props.layoutName.replace('-layout', '');
      let layoutSourceFileName = layoutName + '-layout';
      let layoutClassName = classname(layoutSourceFileName);

      this.props = props;
      this.props.layoutName = layoutName;
      this.props.layoutSourceFileName = layoutSourceFileName;
      this.props.layoutClassName = layoutClassName;
    });
  }

  writing() {
    var tpl = this.props;

    this.fs.copyTpl(
      this.templatePath('_layout.js'),
      this.destinationPath('src/', this.props.layoutSourceFileName + '.js'),
      tpl
    );
  }
};
