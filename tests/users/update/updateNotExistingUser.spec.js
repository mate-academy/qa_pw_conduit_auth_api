import { test } from '../../_fixtures/fixtures';

test('Update not existing user', async ({ registeredUser, usersApi }) => {
  registeredUser['token'] = 'not-existing-token';

  const response = await usersApi.updateUser(registeredUser);

  await usersApi.assertUnauthorizedResponseCode(response);
});
