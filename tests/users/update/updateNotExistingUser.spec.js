import { test } from '../../_fixtures/fixtures';

test('Update not existing user', async ({
  usersApi,
  registeredUser,
}) => {
  let user = await usersApi.loginUser(registeredUser);

  await usersApi.assertResponseCode(user, 200);

  const notExistingUsername = `Michael_Jackson`;

  const response = await usersApi.updateUser({
    username: notExistingUsername,
    email: "sukre@gmail.com",
  });

  await usersApi.assertResponseCode(response, 401);
});