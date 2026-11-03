import { test } from '../../_fixtures/fixtures';
import { UNAUTHORIZED_CODE } from '../../../src/constants/responceCodes';

test('Update user with empty auth token', async ({
  registeredUser,
  updateUserData,
  usersApi,
}) => {
  const response = await usersApi.updateUser('', updateUserData);

  await usersApi.assertResponseCode(response, UNAUTHORIZED_CODE);
});
