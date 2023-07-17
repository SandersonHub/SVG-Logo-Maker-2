const shapes = require('./shapes');
//testing the framework
test('shapes array contains the correct shapes', () => {
  expect(shapes.shapes).toEqual(['circle', 'triangle', 'square']);
});
