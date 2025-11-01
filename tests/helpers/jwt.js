// tests/_helpers/jwt.js
export function fakeInvalidJwt(claims = { id: 999999999 }) {
  const b64u = (obj) =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = claims; // choose a huge numeric id to avoid collisions

  // "xxx" is not a real signature -> token is well-formed but invalid
  return `${b64u(header)}.${b64u(payload)}.xxx`;
}
