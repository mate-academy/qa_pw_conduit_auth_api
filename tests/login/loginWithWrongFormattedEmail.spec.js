import { test } from '../_fixtures/fixtures';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../src/constants/authErrorMessages';

test('Login with wrong formatted email should fail', async ({
  usersApi,
  registeredUser,
}) => {
  const invalidUser = {
    ...registeredUser,
    email: registeredUser.email.replace('@', ''),
  };

  const response = await usersApi.loginUser(invalidUser);

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
  );
});
