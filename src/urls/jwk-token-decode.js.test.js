import { jwkTokenDecode } from './jwk-token-decode';

describe('fn: jwkTokenDecode', () => {
  test('fn: jwkTokenDecode( undefined )', () => {
    expect(jwkTokenDecode()).toBe('');
  });
});
