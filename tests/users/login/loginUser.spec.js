import { test } from '../../_fixtures/fixtures';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';

test('Successful login of registered user', async ({ registeredUser, usersApi }) => {
  const response = await usersApi.loginUser(registeredUser);

  await usersApi.assertSuccessResponseCode(response);

  await usersApi.assertResponseBodyContainsToken(response);
});

test('Login with not existing email', async ({ registeredUser, usersApi }) => {
  const response = await usersApi.loginUser({
    ...registeredUser,
    email: 'not-existing-user@example.com',
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});

test('Login with wrong formatted email', async ({ registeredUser, usersApi }) => {
  const response = await usersApi.loginUser({
    ...registeredUser,
    email: 'wrongformattedemail',
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});

test('Login with wrong password', async ({ registeredUser, usersApi }) => {
  const response = await usersApi.loginUser({
    ...registeredUser,
    password: 'wrongPasswod123*',
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});