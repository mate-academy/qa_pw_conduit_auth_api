import { test } from '../../_fixtures/fixtures';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';

test('Login with wrong formatted email', async ({ usersApi }) => {
  const response = await usersApi.loginUser({
    email: 'invalid-email',
    password: 'TestPassword123!',
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);

  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});
