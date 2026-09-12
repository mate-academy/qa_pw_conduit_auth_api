import { test } from '../../_fixtures/fixtures';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';

test('Login with wrong formatted email', async ({
  registeredUser,
  usersApi,
}) => {
  const response = await usersApi.loginUser({
    email: 'not-emaIL',
    password: registeredUser.password,
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});
