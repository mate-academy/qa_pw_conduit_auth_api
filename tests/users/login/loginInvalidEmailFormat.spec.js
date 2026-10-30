import { test } from '../../_fixtures/fixtures';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';

test(`Login with wrongly formatted email`, async ({
  registeredUser,
  usersApi,
}) => {
  let wrongEmail = registeredUser.email.replace('@', '');

  const response = await usersApi.loginUser({
    email: wrongEmail,
    password: registeredUser.password,
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});
