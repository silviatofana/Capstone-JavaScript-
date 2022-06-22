import { countProducts, calculateComments } from '../modules/Functions.js';

describe('Comments and items counter', () => {
  test('Count Items', () => {
    const array = ['item1', 'item2'];
    countProducts(array);
    expect(countProducts(array)).toEqual(2);
  });

  test('Count Comments', () => {
    const array = ['item1', 'item2'];
    calculateComments(array);
    expect(calculateComments(array)).toEqual('Total Comments(2)');
  });
});
