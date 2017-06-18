/*
 * Copyright © 2017 HatioLab Inc. All rights reserved.  
 */

'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

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
      default: this.appname // Default to current folder name
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      let layoutName = props.layoutName.replace(/ /g, '-');
      let layoutSourceFileName = layoutName.replace('things-scene-', '');
      let layoutClassName = layoutSourceFileName.replace(/\b\w/g, l => l.toUpperCase());

      this.props = props;
      this.props.layoutName = layoutName;
      this.props.layoutSourceFileName = layoutSourceFileName;
      this.props.layoutClassName = layoutClassName;
    });
  }

  writing() {
    var tpl = this.props;

    this.fs.copyTpl([
      this.templatePath() + '/**',
      this.templatePath() + '/**/.*',
      '!**/{.DS_Store,_layout.js}/**'],
      this.destinationPath(),
      tpl
    );

    this.fs.copyTpl(
      this.templatePath('src/_layout.js'),
      this.destinationPath('src/', this.props.layoutSourceFileName + '.js'),
      tpl
    );
  }

  install() {
    this.installDependencies();
  }
};
