const shapes = require('./shapes');

test('shapes array contains the correct shapes', () => {
  expect(shapes.shapes).toEqual(['circle', 'triangle', 'square']);
});
