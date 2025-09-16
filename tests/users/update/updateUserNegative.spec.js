// tests/users/update/updateUser.negative.spec.js
import { test } from '../../_fixtures/fixtures.js';

test('Update user with empty auth token', async ({ usersApi, registeredUser }) => {
  const payload = {
    ...registeredUser,
    token: '', // empty/absent auth
    bio: 'should not be saved',
    image: 'https://example.com/blocked.jpg',
  };

  const response = await usersApi.updateUser(payload);

  await usersApi.assertUnauthorizedResponseCode(response); 
});

test('Update not existing user (invalid token)'
  , async ({ usersApi, registeredUser }) => {
  const payload = {
    ...registeredUser,
    // looks like a JWT but not valid in backend -> should yield 401
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMDAwMDAwIn0.invalidsignature',
    bio: 'should not be saved',
    image: 'https://example.com/blocked.jpg',
  };

  const response = await usersApi.updateUser(payload);

  await usersApi.assertUnauthorizedResponseCode(response); 
});