/*
 * Copyright (c) 2017, HatioLab Inc. All right reserved.
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
      'Welcome to the smashing ' + chalk.red('generator-things:scene-component') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'Your scene-component name?',
      default: this.appname.replace(/ /g, '-') // Default to current folder name
    }, {
      type: 'input',
      name: 'username',
      message: 'What\'s your Github username',
      store: true
    }];

    return this.prompt(prompts).then(props => {
      let componentName = props.componentName;
      let componentTypeName = componentName.replace('things-scene-', '');
      let componentClassName = classname(componentTypeName);

      this.props = props;
      this.props.componentName = componentName;
      this.props.componentTypeName = componentTypeName;
      this.props.componentClassName = componentClassName;
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
      this.templatePath('_things-scene-component.html'),
      this.destinationPath(this.props.componentName + '.html'),
      tpl
    );

    this.fs.copyTpl(
      this.templatePath('demo/_things-scene-component.html'),
      this.destinationPath('demo/', this.props.componentName + '.html'),
      tpl
    );

    this.fs.copyTpl(
      this.templatePath('src/_component.js'),
      this.destinationPath('src/', this.props.componentTypeName + '.js'),
      tpl
    );

    this.fs.copyTpl(
      this.templatePath('test/unit/_test-component.js'),
      this.destinationPath('test/unit', 'test-' + this.props.componentTypeName + '.js'),
      tpl
    );
  }

  install() {
    this.installDependencies();
  }
};
