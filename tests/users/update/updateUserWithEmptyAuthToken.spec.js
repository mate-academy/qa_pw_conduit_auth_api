import { test } from '../../_fixtures/fixtures';

test('Update user with empty auth token', async ({ 
  usersApi, 
  registeredUser 
}) => {
  
  const response = await usersApi.updateUser({
    ...registeredUser,
    token: '',
    bio: 'Updated bio',
  });

  await usersApi.assertResponseCode(response, 401);
});
