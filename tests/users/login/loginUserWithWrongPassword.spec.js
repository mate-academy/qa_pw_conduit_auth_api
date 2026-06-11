import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';
import { test } from '../../_fixtures/fixtures';

test(`Login user with wrong password`, async ({
  registeredUser,
  usersApi,
}) => {
  registeredUser.password = 'incorrect_password';

  const response = await usersApi.loginUser(registeredUser);

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});
