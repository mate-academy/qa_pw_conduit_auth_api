import { test } from '../../_fixtures/fixtures';
import { expect } from 'allure-playwright';

test(`Update user with empty auth token`, async ({ registeredUser, usersApi }) => {
  registeredUser['token'] = '';

  const response = await usersApi.updateUser(registeredUser);

  expect(response.status()).toBe(401);

  await usersApi.assertResponseBodyContainsPlainText(response, 'Unauthorized');
});

