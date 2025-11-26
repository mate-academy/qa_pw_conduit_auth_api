import { test } from '../../_fixtures/fixtures';

test('Login with wrong password', async ({ registeredUser, usersApi }) => {
  registeredUser.password = 'wrong_password';
  delete registeredUser.token;

  const response = await usersApi.logInUser(registeredUser);

  await usersApi.assertUnprocessableEntityResponseCode(response);
});
