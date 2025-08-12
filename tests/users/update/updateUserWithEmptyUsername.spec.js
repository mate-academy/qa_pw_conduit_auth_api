import { test } from '../../_fixtures/fixtures';

test(`Update user with empty username`, async ({ registeredUser, usersApi }) => {
  registeredUser['username'] = '';

  const response = await usersApi.updateUser(registeredUser);

  await usersApi.assertUnprocessableEntityResponseCode(response);
});
