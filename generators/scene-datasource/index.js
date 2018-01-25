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
      'Welcome to the smashing ' + chalk.red('generator-things:scene-datasource') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'Your DataSource style scene-datasource-component name?',
      default: this.appname.replace(/ /g, '-') // Default to current folder name
    }];

    return this.prompt(prompts).then(props => {

      let componentName = props.componentName;
      let componentTypeName = componentName.replace('things-scene-', '');
      let componentClassName = classname(componentTypeName);

      this.props = props;
      this.props.moduleName = this.appname.replace(/ /g, '-');
      this.props.componentName = componentName;
      this.props.componentTypeName = componentTypeName;
      this.props.componentClassName = componentClassName;
    });
  }

  writing() {
    var tpl = this.props;

    this.fs.copyTpl(
      this.templatePath('src/_component.js'),
      this.destinationPath('src/', this.props.componentTypeName + '.js'),
      tpl
    );

    this.fs.copyTpl(
      this.templatePath('demo/_demo.html'),
      this.destinationPath('demo/', 'index-' + this.props.componentTypeName + '.html'),
      tpl
    );
  }

  install() {}
};
