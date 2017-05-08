'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the smashing ' + chalk.red('generator-things') + ' generator!'
    ));

    const prompts = [{
      type    : 'input',
      name    : 'componentName',
      message : 'Your component name?',
      default : this.appname // Default to current folder name
    }, {
      type    : 'input',
      name    : 'username',
      message : 'What\'s your Github username',
      store   : true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      let componentName = props.componentName.replace(/ /g, '-');
      let componentTagName = componentName.replace('things-scene-', '');
      let componentClassName = componentTagName.replace(/\b\w/g, l => l.toUpperCase());

      console.log(componentName, componentClassName, componentTagName)

      this.props = props;
      this.props.componentName = componentName;
      this.props.componentTagName = componentTagName;
      this.props.componentClassName = componentClassName;
    });
  }

  writing() {
    // this.fs.copy([
    //   this.templatePath() + '/**',
    //   this.templatePath() + '/**/.*',
    //   '!**/{gulpfile.js,bower.json,package.json,.git,.npmignore,.gitignore,wct.conf.js,docs,test}/**'],
    //   this.destinationPath()
    // );

    // Used by component template
    var tpl = this.props;
    // {
    //   componentName: this.props.componentName,
    //   username: this.props.username
    // };

    this.fs.copyTpl([
      this.templatePath() + '/**',
      this.templatePath() + '/**/.*',
      '!**/{.DS_Store,_things-scene-component.html}/**'],
      this.destinationPath(),
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
      this.templatePath('src/_component.html'),
      this.destinationPath('src/', this.props.componentTagName + '.js'),
      tpl
    );
  }

  install() {
    this.installDependencies();
  }
};
