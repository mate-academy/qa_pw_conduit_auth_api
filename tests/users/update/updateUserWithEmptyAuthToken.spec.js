import { test } from '../../_fixtures/fixtures';

test('Update user with empty auth token', async ({
  usersApi,
  registeredUser
}) => {
  registeredUser['token'] = '';

  const response = await usersApi.updateUser(registeredUser);

  await usersApi.assertUnauthorizedResponseCode(response);
});