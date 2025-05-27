import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';
import { test } from '../../_fixtures/fixtures';

const notExistingEmail = 'test_yuriy@email.com';

test('Login with not existing email', async ({
  newUserData: {
    password 
  }, 
  usersApi
}) => {
  const response = await usersApi.loginUser(
    notExistingEmail,
    password
  );

  await usersApi.assertResponseCode(response, 422);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password'
  );
});