import { test } from '../../_fixtures/fixtures';

test.describe('Update user negative scenarios', () => {

  test(`Update user with an invalid auth token`, async ({
    registeredUser,
    usersApi,
  }) => {
    const updatedData = { bio: 'Updated bio for testing' };

    const response = await usersApi.updateUser(
      registeredUser.username,
      updatedData,
      'invalid_token'
    );

    await usersApi.assertUnauthorizedResponseCode(response);
  });

  test(`Update a non-existing user`, async ({ usersApi }) => {
    const fakeUser = {
      username: 'not_existing_user',
      bio: 'Trying to update non-existing user',
    };

    const response = await usersApi.updateUser(fakeUser.username, fakeUser);
    await usersApi.assertNotFoundResponseCode(response);
  });
});
