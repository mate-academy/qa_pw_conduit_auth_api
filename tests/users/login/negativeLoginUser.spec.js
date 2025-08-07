import { expect } from 'allure-playwright';
import { test } from '../../_fixtures/fixtures';

test('Login with non-existing email', async ({ usersApi }) => {
  const credentials = {
    email: `notfound_${Date.now()}@test.comn`,
    password: 'test123123',
  };
  const response = await usersApi.loginUser(credentials);

  expect(response.status()).toBe(422);
});

test('Login with invalid email formar', async ({ usersApi }) => {
  const credentials = {
    email: 'test-test',
    password: 'test123123',
  };

  const response = await usersApi.loginUser(credentials);
  expect(response.status()).toBe(422);
});

test('Login with incorrect password', async ({ usersApi, registeredUser }) => {
  const credentials = {
    email: registeredUser.email,
    password: 'test123123',
  };

  const response = await usersApi.loginUser(credentials);
  expect(response.status()).toBe(422);
});
