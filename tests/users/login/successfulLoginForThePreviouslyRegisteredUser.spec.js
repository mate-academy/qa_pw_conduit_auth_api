import { test } from '../../_fixtures/fixtures';

test('Successful login for the previously registered user', async ({ registeredUser, usersApi }) => {
  const { email, password, username } = registeredUser;

  const loginResponse = await usersApi.login({ email, password });

  await usersApi.assertSuccessResponseCode(loginResponse);
  await usersApi.assertResponseBodyContainsToken(loginResponse);
  await usersApi.assertEmailHasCorrectValue(loginResponse, email);
  await usersApi.assertUsernameHasCorrectValue(loginResponse, username);
});
