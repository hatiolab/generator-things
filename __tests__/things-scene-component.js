'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-things:scene-component', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/scene-component'))
      .withPrompts({
        componentName: 'sample'
      });
  });

  it('creates files', () => {
    assert.file([
      'bower.json'
    ]);
  });
});
