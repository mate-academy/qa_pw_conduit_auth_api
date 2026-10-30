import { test } from '../../_fixtures/fixtures';

test(`Update not existing user`, async ({ registeredUser, usersApi }) => {
  const nonExistingUser = {
    ...registeredUser,
    email: `notexisting${Date.now()}@example.com`,
    username: `notexisting${Date.now()}`,
    bio: 'Updated bio for the user.',
    image: 'https://example.com/updateduser.jpg',
    token: 'notExistingUserToken',
  };

  const response = await usersApi.updateUser(nonExistingUser);

  await usersApi.assertUnauthorizedResponseCode(response);
});
