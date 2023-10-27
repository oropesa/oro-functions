import { isString } from 'oro-functions-client';
import atob from 'atob';

export function jwkTokenDecode(token: string): string {
  if (!isString(token)) {
    return '';
  }

  const fnAtob = global.atob === undefined ? atob : global.atob;

  let jwtToken = token;
  jwtToken.includes('.') && (jwtToken = jwtToken.split('.')[1]);

  try {
    return decodeURIComponent(
      [...fnAtob(jwtToken.replace('-', '+').replace('_', '/'))]
        .map((c) => `%${('00' + c.codePointAt(0)!.toString(16)).slice(-2)}`)
        .join(''),
    );
  } catch {
    return '';
  }
}
