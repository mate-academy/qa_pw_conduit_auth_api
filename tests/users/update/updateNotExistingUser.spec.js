import { test } from '../../_fixtures/fixtures';
import { UNAUTHORIZED_CODE } from '../../../src/constants/responceCodes';

test('Update not existing user', async ({ updateUserData, usersApi }) => {
  const response = await usersApi.updateUser(
    'not_existing_token',
    updateUserData,
  );

  await usersApi.assertResponseCode(response, UNAUTHORIZED_CODE);
});
