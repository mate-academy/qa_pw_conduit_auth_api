import { test } from '../../_fixtures/fixtures';

test('Update user with empty auth token', async ({
  registeredUser,
  usersApi,
}) => {
  const userData = {
    ...registeredUser,
    token: '',
  };

  const response = await usersApi.updateUser(userData);
  await usersApi.assertUnauthorizedResponseCode(response);
});
