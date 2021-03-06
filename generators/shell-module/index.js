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
      'Welcome to the smashing ' + chalk.red('generator-things:shell-module') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'Your things module name?',
      default: this.appname.replace(/ /g, '-')
    }, {
      type: 'input',
      name: 'username',
      message: 'What\'s your Github username',
      store: true
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;

      this.props.simpleModuleName = props.moduleName.replace('things-scene-', '');
    });
  }

  writing() {
    var tpl = this.props;

    this.fs.copyTpl([
      this.templatePath() + '/**',
      this.templatePath() + '/**/.*',
      '!**/{.DS_Store,_*}/**'],
      this.destinationPath(),
      tpl
    );

    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore'),
      tpl
    );

    this.fs.copyTpl(
      this.templatePath('_vscode'),
      this.destinationPath('.vscode'),
      tpl
    );
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }
};
