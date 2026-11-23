import { test } from '../../_fixtures/fixtures';

test('Update not existing user with invalid token', async ({
  newUserData,
  usersApi,
}) => {
  const response = await usersApi.updateUser({
    ...newUserData,
    token: 'invalid.nonexistent.user.token',
    bio: 'Updated bio',
  });

  await usersApi.assertResponseCode(response, 401);
});
