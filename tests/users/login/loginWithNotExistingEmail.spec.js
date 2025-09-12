import { test } from '../../_fixtures/fixtures';

test('Login with not existing email', async ({ registeredUser, usersApi }) => {
  const { email, password } = registeredUser;

  const nonExistentEmail = `non_${email}`;

  const loginResponse = await usersApi.login({ email: nonExistentEmail, password });
  await usersApi.assertUnprocessableEntityResponseCode(loginResponse);
});
