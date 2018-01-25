/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import './util'

import { expect } from 'chai'

import '../../bower_components/things-scene-core/things-scene-min'
import { <%= componentClassName %> } from '../../src/index'

describe('<%= componentClassName %>', function () {

  var board;

  beforeEach(function () {
    board = scene.create({
      model: {
        components: [{
          id: '<%= componentTypeName %>',
          type: '<%= componentTypeName %>'
        }]
      }
    })
  });

  it('component should be found by its id.', function () {

    var component = board.findById('<%= componentTypeName %>')

    expect(!!component).not.to.equal(false);
  });
});
