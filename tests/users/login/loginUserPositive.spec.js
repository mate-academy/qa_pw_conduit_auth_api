import { test } from '../../_fixtures/fixtures';

let userName;
let userEmail;
let userPassword;

test.beforeEach(async ({ newUserData, usersApi }) => {
  userPassword = newUserData.password;
  userEmail = newUserData.email;
  userName = newUserData.username;

  const response = await usersApi.registerNewUser(newUserData);

  await usersApi.assertSuccessResponseCode(response);

  await usersApi.assertUsernameHasCorrectValue(response, newUserData.username);
  await usersApi.assertEmailHasCorrectValue(response, newUserData.email);
  await usersApi.assertResponseBodyContainsToken(response);
});

test('Successfull login for the previosuly regsitered user', async ({
  usersApi,
}) => {
  const loginCredentials = {
    email: userEmail,
    password: userPassword,
  };

  const response = await usersApi.loginUser(loginCredentials);

  await usersApi.assertSuccessResponseCode(response);

  await usersApi.assertUsernameHasCorrectValue(response, userName);
  await usersApi.assertEmailHasCorrectValue(response, userEmail);
  await usersApi.assertResponseBodyContainsToken(response);
});
