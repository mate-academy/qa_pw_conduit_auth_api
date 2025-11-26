import { test, expect } from '../../_fixtures/fixtures';

test.describe('Update user negative scenarios', () => {

  test(`Update user with empty auth token`, async ({ registeredUser, usersApi }) => {
    const updatedData = {
      username: registeredUser.username,
      bio: 'Updated bio for testing',
      token: '', // Empty auth token
    };

    const response = await usersApi.updateUser(updatedData);

    // Should return 401 Unauthorized since token is empty
    await usersApi.assertUnauthorizedResponseCode(response);
  });

  test(`Update a non-existing user with empty auth token`, async ({ usersApi }) => {
    const updatedData = {
      username: 'not_existing_user',
      bio: 'Trying to update non-existing user',
      token: '', // Empty auth token
    };

    const response = await usersApi.updateUser(updatedData);

    // Should return 401 Unauthorized because token is required
    await usersApi.assertUnauthorizedResponseCode(response);
  });

});
