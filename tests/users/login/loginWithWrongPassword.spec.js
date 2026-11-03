import { test } from '../../_fixtures/fixtures';
import { UNPROCESSABLE_ENTITY } from '../../../src/constants/responceCodes';

test.beforeEach(async ({ newUserData, usersApi }) => {
  const response = await usersApi.registerNewUser(newUserData);

  await usersApi.assertSuccessResponseCode(response);
});

test('Login with wrong password', async ({ newUserData, usersApi }) => {
  const response = await usersApi.loginUser({
    ...newUserData,
    password: `${newUserData.password}_wrong`,
  });

  await usersApi.assertResponseCode(response, UNPROCESSABLE_ENTITY);
});
