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

test('Login with not existing email', async ({ newUserData, usersApi }) => {
  const response = await usersApi.loginUser({
    email: faker.internet.email(),
    password: newUserData.password,
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    UNDEFINED_EMAIL,
    'email',
  );
});
