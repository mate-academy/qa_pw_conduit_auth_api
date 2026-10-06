import { test } from '../../_fixtures/fixtures';

test(`Update not existing user`, async ({ newUserData, usersApi }) => {
  const userData = {
    ...newUserData,
    bio: 'Updated bio for a user that does not exist.',
    token: 'invalid-token',
  };

  const response = await usersApi.updateUser(userData);

  await usersApi.assertUnauthorizedResponseCode(response);
});
