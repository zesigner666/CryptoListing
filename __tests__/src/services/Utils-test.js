import { getUSDPrice } from '../../../src/services/Utils';

describe('Utils tests', () => {

  test('getUSDPrice with random values for ', () => {
    expect(getUSDPrice(0.03452345234)).toBe('$0.03 USD');
    expect(getUSDPrice(100.4564)).toBe('$100.46 USD');
    expect(getUSDPrice(100.4544)).toBe('$100.45 USD');
    expect(getUSDPrice(200)).toBe('$200.00 USD');
    expect(getUSDPrice(1.3452)).toBe('$1.35 USD');
  });

});