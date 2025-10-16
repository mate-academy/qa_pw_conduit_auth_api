import { test } from '../../_fixtures/fixtures';

test('Login with wrong password', async ({ registeredUser, usersApi }) => {
  const { password } = registeredUser;

  const wrongPassword = `${password}_wrong`;

  const loginResponse = await usersApi.login({ wrongPassword });
  await usersApi.assertUnprocessableEntityResponseCode(loginResponse);
});
