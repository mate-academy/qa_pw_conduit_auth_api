import { test } from '../../_fixtures/fixtures';
import { expect } from 'allure-playwright';

test(`Update not existing user`, async ({ registeredUser, usersApi }) => {
  registeredUser['username'] = '';

  const response = await usersApi.updateUser(registeredUser);

  await usersApi.assertUnprocessableEntityResponseCode(response);
});
