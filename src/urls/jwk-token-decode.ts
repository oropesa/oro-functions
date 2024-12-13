import atob from 'atob';
import { isString } from 'oro-functions-client';

export function jwkTokenDecode(token: string): string {
  if (!isString(token)) {
    return '';
  }

  // eslint-disable-next-line unicorn/prefer-global-this
  const fnAtob = global.atob === undefined ? atob : global.atob;

  const jwtToken = token.includes('.') ? token.split('.')[1] : token;

  try {
    return decodeURIComponent(
      [...fnAtob(jwtToken.replace('-', '+').replace('_', '/'))]
        .map((c) => `%${`00${c.codePointAt(0)!.toString(16)}`.slice(-2)}`)
        .join(''),
    );
  } catch {
    return '';
  }
}
