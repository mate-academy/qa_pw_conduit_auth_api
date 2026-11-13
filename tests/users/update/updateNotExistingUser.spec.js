import { test } from '../../_fixtures/fixtures';

test('Update not existing user', async ({
  usersApi,
}) => {
  const notExistingUsername = `Michael_Jackson`;

  const response = await usersApi.updateUser({
    username: notExistingUsername,
    email: "sukre@gmail.com",
  });

  await usersApi.assertResponseCode(response, 401);
});