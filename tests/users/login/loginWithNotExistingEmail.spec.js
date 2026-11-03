import { test } from '../../_fixtures/fixtures';
import { UNPROCESSABLE_ENTITY } from '../../../src/constants/responceCodes';

test('Login with not existing email', async ({ newUserData, usersApi }) => {
  const response = await usersApi.loginUser(newUserData);

  await usersApi.assertResponseCode(response, UNPROCESSABLE_ENTITY);
});
