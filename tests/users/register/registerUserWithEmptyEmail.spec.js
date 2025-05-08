import { test } from '../../_fixtures/fixtures';
import { EMPTY_EMAIL_MESSAGE } from '../../../src/constants/authErrorMessages';

test('Register user with empty email', async ({ usersApi, newUserData }) => {
  const response = await usersApi.registerNewUser({
    email: newUserData.email,
    password: '',
    username: newUserData.username,
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    EMPTY_EMAIL_MESSAGE,
  );
});
