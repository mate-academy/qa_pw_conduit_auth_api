import { test } from '../../_fixtures/fixtures';
import { UNAUTHORIZED } from '../../../src/constants/responceCodes';

test(`Update user with empty auth token`, async ({
  registeredUser,
  usersApi,
}) => {
  const response = await usersApi.updateUser({
    ...registeredUser,
    token: '',
    bio: 'Trying to update without a valid token',
  });

  await usersApi.assertResponseCode(response, UNAUTHORIZED);
});
