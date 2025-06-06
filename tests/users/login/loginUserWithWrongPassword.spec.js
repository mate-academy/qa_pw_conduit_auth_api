import { test } from '../../_fixtures/fixtures';

let userEmail;

test.beforeEach(async ({ newUserData, usersApi }) => {
  userEmail = newUserData.email;

  const response = await usersApi.registerNewUser(newUserData);

  await usersApi.assertSuccessResponseCode(response);

  await usersApi.assertUsernameHasCorrectValue(response, newUserData.username);
  await usersApi.assertEmailHasCorrectValue(response, newUserData.email);
  await usersApi.assertResponseBodyContainsToken(response);
});

test('Login with wrong password', async ({ usersApi }) => {
  const wrongPassword = 'wrongPassword123';

  const loginCredentials = {
    email: userEmail,
    password: wrongPassword,
  };

  const response = await usersApi.loginUser(loginCredentials);

  await usersApi.assertUnprocessableEntityResponseCode(response);
});
