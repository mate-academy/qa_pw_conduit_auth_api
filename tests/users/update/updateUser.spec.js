import { test } from '../../_fixtures/fixtures';
import { UNAUTHORIZED_CODE } from '../../../src/constants/responceCodes';



test.describe('Different users updates flows', () => {

  test(
    `Update user with empty auth token`,
    async ({ registeredUser, usersApi }) => {
      registeredUser['token'] = ''
      const response = await usersApi.updateUser(registeredUser);
      await usersApi.assertResponseCode(response, UNAUTHORIZED_CODE);
  });

  test(`Update not existing user`, async ({ newUserData, usersApi }) => {
    const response = await usersApi.updateUser(newUserData);
    await usersApi.assertResponseCode(response, UNAUTHORIZED_CODE);
  });

})
