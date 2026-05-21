import { faker } from '@faker-js/faker';
import { test } from '../../_fixtures/fixtures';
import { UNDEFINED_EMAIL } from '../../../src/constants/authErrorMessages';


test.beforeEach(async ({ usersApi, newUserData }) => {
  const response = await usersApi.registerNewUser({
    email: newUserData.email,
    password: newUserData.password,
    username: newUserData.username,
  });

  await usersApi.assertSuccessResponseCode(response);
});

test('Login with wrong formatted email',
  async ({ newUserData, usersApi }) => {
    newUserData.email = 'Mathias123.dsfs'

    const response = await usersApi.loginUser({
      email: newUserData.email,
      password: newUserData.password,
    });

    await usersApi.assertUnprocessableEntityResponseCode(response);
    await usersApi.assertErrorMessageInResponseBody(
      response,
      UNDEFINED_EMAIL,
      'email',
    );
  });
