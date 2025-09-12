import { expect } from 'allure-playwright';
import { test } from '../../_fixtures/fixtures';
import { SUCCESS_CODE } from '../../../src/constants/responceCodes';

test('Successful login for previously registered user', async ({
  usersApi,
  registeredUser,
}) => {
  const credentials = {
    email: registeredUser.email,
    password: registeredUser.password,
  };

  const response = await usersApi.loginUser(credentials);

  expect(response.status()).toBe(SUCCESS_CODE);
  await usersApi.assertResponseBodyContainsToken(response);
  await usersApi.assertEmailHasCorrectValue(response, registeredUser.email);
});
