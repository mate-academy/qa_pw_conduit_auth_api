import { test } from '../../_fixtures/fixtures';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';

test('Login with not existing email', async ({ registeredUser, loginApi }) => {
  const response = await loginApi.loginUser(
    `not-existing-${registeredUser.email}`,
    registeredUser.password,
  );

  await loginApi.assertUnprocessableEntityResponseCode(response);
  await loginApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});
