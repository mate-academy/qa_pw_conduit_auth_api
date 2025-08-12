import { test } from '../../_fixtures/fixtures';

test(`Update non-existing user`, async ({ registeredUser, usersApi }) => {
  registeredUser['username'] = '';

  const response = await usersApi.updateUser(registeredUser);

  await usersApi.assertUnprocessableEntityResponseCode(response);
});
