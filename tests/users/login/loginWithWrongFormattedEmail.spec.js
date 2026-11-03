import { test } from '../../_fixtures/fixtures';
import { UNPROCESSABLE_ENTITY } from '../../../src/constants/responceCodes';

test('Login with wrong formatted email', async ({ newUserData, usersApi }) => {
  const response = await usersApi.loginUser({
    ...newUserData,
    email: 'wrongemail.com',
  });

  await usersApi.assertResponseCode(response, UNPROCESSABLE_ENTITY);
});
