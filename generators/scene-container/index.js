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
      'Welcome to the smashing ' + chalk.red('generator-things:scene-container') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'Your container style scene-component name?'
    }];

    return this.prompt(prompts).then(props => {

      let componentName = props.componentName;
      let componentClassName = classname(componentName);

      this.props = props;
      this.props.componentName = componentName;
      this.props.componentClassName = componentClassName;
    });
  }

  writing() {
    var tpl = this.props;

    this.fs.copyTpl(
      this.templatePath('_component.js'),
      this.destinationPath('src/', this.props.componentName + '.js'),
      tpl
    );
  }

  install() {}
};
