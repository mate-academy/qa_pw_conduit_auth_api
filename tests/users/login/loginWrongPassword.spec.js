import { test } from '../../_fixtures/fixtures';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';
import { faker } from '@faker-js/faker';

test(`Login with wrong password`, async ({ registeredUser, usersApi }) => {
  let wrongPassword = faker.internet.password();

  const response = await usersApi.loginUser({
    email: registeredUser.email,
    password: wrongPassword,
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});
