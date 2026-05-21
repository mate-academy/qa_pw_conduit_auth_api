import { test } from '../../_fixtures/fixtures';

test.beforeEach(async ({ usersApi, newUserData }) => {
  const response = await usersApi.registerNewUser({
    email: newUserData.email,
    password: newUserData.password,
    username: newUserData.username,
  });

  await usersApi.assertSuccessResponseCode(response);
});

test('Successful user login', async ({ newUserData, usersApi }) => {
  const response = await usersApi.loginUser(newUserData);

  await usersApi.assertSuccessResponseCode(response);

  await usersApi.assertUsernameHasCorrectValue(response, newUserData.username);
  await usersApi.assertEmailHasCorrectValue(response, newUserData.email);
  await usersApi.assertResponseBodyContainsToken(response);
});
