import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test('Login with not existing email', async ({ usersApi }) => {
  const nonExistentEmail = faker.internet.email();
  const userPassword = faker.internet.password();

  const loginCredentials = {
    email: nonExistentEmail,
    password: userPassword,
  };

  const response = await usersApi.loginUser(loginCredentials);

  await usersApi.assertUnprocessableEntityResponseCode(response);
});
