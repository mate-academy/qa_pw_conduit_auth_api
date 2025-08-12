import { test } from '../../_fixtures/fixtures';

test('Login with wrong formatted email', async ({ registeredUser, usersApi }) => {
  const { email, password } = registeredUser;

  const wrongFormattedEmail = email.replace('@', '');

  const loginResponse = await usersApi.login({ email: wrongFormattedEmail, password });
  await usersApi.assertUnprocessableEntityResponseCode(loginResponse);
});
