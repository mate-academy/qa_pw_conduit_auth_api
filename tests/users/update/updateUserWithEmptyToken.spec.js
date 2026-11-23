import { test } from '../../_fixtures/fixtures';

test('Update user with empty auth token', async ({
  registeredUser,
  usersApi,
}) => {
  const response = await usersApi.updateUser({
    ...registeredUser,
    token: '',
    bio: 'Updated bio without authorization',
  });

  await usersApi.assertResponseCode(response, 401);
});
