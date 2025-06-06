import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test('Login with wrong formatted email', async ({ usersApi }) => {
  const malformedEmail = 'invalid-email-example.com';
  const userPassword = faker.internet.password();

  const loginCredentials = {
    email: malformedEmail,
    password: userPassword,
  };

  const response = await usersApi.loginUser(loginCredentials);

  await usersApi.assertUnprocessableEntityResponseCode(response);
});
