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
      'Welcome to the smashing ' + chalk.red('generator-things:shell-editor') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'editorName',
      message: 'Your editor name?'
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.props.editorClassName = classname(props.editorName) + 'Editor';
    });
  }

  writing() {
    var tpl = this.props;

    this.fs.copyTpl(
      this.templatePath('_editor.js'),
      this.destinationPath('src/editors/' + this.props.editorName + '-editor.js'),
      tpl
    );
  }
};
