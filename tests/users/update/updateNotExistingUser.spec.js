import { test } from '../../_fixtures/fixtures';

test('Update not existing user', async ({ registeredUser, usersApi }) => {
  const userData = {
    ...registeredUser,
    token: 'notExisting',
  };

  const response = await usersApi.updateUser(userData);
  await usersApi.assertUnauthorizedResponseCode(response);
});
