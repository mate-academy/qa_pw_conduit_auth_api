import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';
import { test } from '../../_fixtures/fixtures';

const wrongFormattedEmail = 'test_yuriyemail.com';
const validPassword = 'Testpass123!';

test('login with wrong formatted email', async ({ usersApi }) => {
  const response = await usersApi.loginUser(
    wrongFormattedEmail,
    validPassword,
  );

  await usersApi.assertResponseCode(response, 422);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password'
  );
});