import { countProducts } from '../modules/Functions.js';

describe('Comments and items counter', () => {
  test('Count Items', () => {
    const array = ['item1', 'item2'];
    countProducts(array);
    expect(countProducts(array)).toEqual(2);
  });
});