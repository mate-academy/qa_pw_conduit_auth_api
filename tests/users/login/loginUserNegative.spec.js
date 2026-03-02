import { test } from '../../_fixtures/fixtures';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';

test('Login user with not existing email', async ({
  usersApi,
  registeredUser,
}) => {
  const response = await usersApi.loginUser({
    email: 'notexisting@email.com',
    password: registeredUser.password,
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});

test('Login user with wrong formatted email', async ({
  usersApi,
  registeredUser,
}) => {
  const response = await usersApi.loginUser({
    email: 'notexisting@email',
    password: registeredUser.password,
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});

test('Login user with wrong password', async ({ usersApi, registeredUser }) => {
  const response = await usersApi.loginUser({
    email: registeredUser.email,
    password: 'wrongpassword',
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});