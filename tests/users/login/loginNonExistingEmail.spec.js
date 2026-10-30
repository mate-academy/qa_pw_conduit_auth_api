import { test } from '../../_fixtures/fixtures';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';
import { faker } from '@faker-js/faker';

test(`Login with non-existing email`, async ({ registeredUser, usersApi }) => {
  let nonExistingEmail = faker.internet.email();

  const response = await usersApi.loginUser({
    email: nonExistingEmail,
    password: registeredUser.password,
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});
