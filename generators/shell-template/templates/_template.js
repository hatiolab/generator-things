import icon from './<%= templateName %>.png';

export default {
  type: '<%= templateName %>',
  description: '<%= templateName %>',
  group: 'etc',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: '<%= templateName %>',
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    fillStyle: 'cyan',
    strokeStyle: 'darkgray'
  }
};
