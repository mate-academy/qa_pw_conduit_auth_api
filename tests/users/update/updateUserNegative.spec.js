import { test } from '../../_fixtures/fixtures.js';
import { fakeInvalidJwt } from '../../helpers/jwt.js';

test('Update user with empty auth token', async ({ usersApi, registeredUser }) => {
  const payload = { ...registeredUser, token: '', bio: 'x', image: 'https://x' };
  const res = await usersApi.updateUser(payload);
  await usersApi.assertUnauthorizedResponseCode(res);
  await usersApi.assertUnauthorizedErrorBody(res);
});

test('Update not existing user (invalid token)', async ({ usersApi, registeredUser }) => {
  const token = fakeInvalidJwt({ id: 999999999 });
  const payload = { ...registeredUser, token, bio: 'x', image: 'https://x' };

  const res = await usersApi.updateUser(payload);

  await usersApi.assertUnauthorizedResponseCode(res);
  await usersApi.assertUnauthorizedErrorBody(res);
});
