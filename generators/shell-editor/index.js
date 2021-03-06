/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const types = require('babel-types')
const generate = require('babel-generator').default

const isImportDeclaration = path =>
  types.isImportDeclaration(path.node) ||
  types.isImportSpecifier(path.parent) ||
  types.isImportDeclaration(path.parent) ||
  types.isImportSpecifier(path.parent) ||
  types.isImportDefaultSpecifier(path.parent)

function classname(str) {
  return str
    .replace(/-/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return letter.toUpperCase()
    })
    .replace(/\s+/g, '')
}

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(
        'Welcome to the smashing ' +
          chalk.red('generator-things:shell-editor') +
          ' generator!'
      )
    )

    const prompts = [
      {
        type: 'input',
        name: 'editorName',
        message: 'Your editor name?'
      }
    ]

    return this.prompt(prompts).then(props => {
      this.props = props
      this.props.editorClassName = classname(props.editorName) + 'Editor'
    })
  }

  writing() {
    var tpl = this.props

    this.fs.copyTpl(
      this.templatePath('_editor.js'),
      this.destinationPath('src/editors/' + tpl.editorName + '-editor.js'),
      tpl
    )

    const source = this.fs.read(this.destinationPath('src/editors/index.js'))

    const ast = babylon.parse(source, {
      sourceType: 'module'
    })

    const declaration = types.importDeclaration(
      [types.importDefaultSpecifier(types.identifier(tpl.editorClassName))],
      types.stringLiteral(`./${tpl.editorName}-editor`)
    )

    let lastImport = null
    let firstExport = null
    let doneImport = false
    let doneExport = false

    traverse(ast, {
      enter(path) {
        if (!doneImport) {
          if (lastImport && !isImportDeclaration(path)) {
            lastImport.insertAfter(declaration)
            doneImport = true
          } else if (firstExport) {
            firstExport.insertBefore(declaration)
            doneImport = true
          }
        }
      },

      ImportDeclaration(path) {
        lastImport = path
      },

      ExportDefaultDeclaration(path) {
        if (!firstExport) {
          firstExport = path
        }
      },

      ArrayExpression(path) {
        if (!doneExport && firstExport) {
          path.node.elements.push(
            types.objectExpression([
              types.objectProperty(
                types.identifier('type'),
                types.stringLiteral(tpl.editorName)
              ),
              types.objectProperty(
                types.identifier('element'),
                types.memberExpression(
                  types.identifier(tpl.editorClassName),
                  types.identifier('is')
                )
              )
            ])
          )
          doneExport = true
        }
      }
    })

    // Generate actually source code from modified AST
    const { code } = generate(
      ast,
      {
        /* Options */
      },
      source
    )

    // Write source back to file
    this.fs.write(this.destinationPath('src/editors/index.js'), code)
  }
}
