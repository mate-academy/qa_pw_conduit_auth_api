import { test } from '../../_fixtures/fixtures';
import { invalidPassword } from '../../../src/common/testData/generateInvalidLoginData';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';

test.beforeEach(async ({ usersApi, newUserData }) => {
  await usersApi.registerNewUser(newUserData);
});

test(`Login with wrong password`, async ({ usersApi, newUserData }) => {
  const response = await usersApi.loginUser(newUserData.email, invalidPassword);

  const key = `email or password`;

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    key,
  );
});
