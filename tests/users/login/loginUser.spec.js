// tests/auth/login.spec.js
import { test } from '../../_fixtures/fixtures.js';
import { INVALID_EMAIL_MESSAGE } from '../../../src/constants/authErrorMessages.js';

test('Successful login for previously registered user', async ({ usersApi, registeredUser }) => {
  const response = await usersApi.loginUser({
    email: registeredUser.email,
    password: registeredUser.password,
  });

  await usersApi.assertSuccessResponseCode(response);
  await usersApi.assertEmailHasCorrectValue(response, registeredUser.email);
  await usersApi.assertUsernameHasCorrectValue(response, registeredUser.username);
  await usersApi.assertResponseBodyContainsToken(response);
});

test('Login with not existing email', async ({ usersApi, newUserData }) => {
  const response = await usersApi.loginUser({
    email: `no_${newUserData.email}`,
    password: newUserData.password,
  });

  await usersApi.assertInvalidCredentials(response);
});

test('Login with wrong password', async ({ usersApi, registeredUser }) => {
  const response = await usersApi.loginUser({
    email: registeredUser.email,
    password: registeredUser.password + '_wrong',
  });

  await usersApi.assertInvalidCredentials(response);
});

test('Login with wrong formatted email', async ({ usersApi, newUserData }) => {
  const response = await usersApi.loginUser({
    email: 'wrong-format',
    password: newUserData.password,
  });

  await usersApi.assertInvalidCredentials(response);
});
