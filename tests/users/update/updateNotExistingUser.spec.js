import { test } from '../../_fixtures/fixtures';
import { UNAUTHORIZED } from '../../../src/constants/responceCodes';

test('Update not existing user', async ({ newUserData, usersApi }) => {
  const response = await usersApi.updateUser({
    ...newUserData,
    token: 'fake.token3344433',
    bio: 'Trying to update a user that does not exis',
  });

  await usersApi.assertResponseCode(response, UNAUTHORIZED);
});
