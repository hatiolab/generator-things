'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-things:things-scene-component', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/things-scene-component'))
      .withPrompts({someAnswer: true});
  });

  it('creates files', () => {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
