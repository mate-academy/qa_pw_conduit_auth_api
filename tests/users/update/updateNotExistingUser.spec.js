import { test } from '../../_fixtures/fixtures';

test('Update user with invalid token', async ({ usersApi, newUserData }) => {
  const response = await usersApi.updateUser({
    ...newUserData,
    token: 'invalid-token',
  });

  await usersApi.assertResponseCode(response, 401);
}); 
