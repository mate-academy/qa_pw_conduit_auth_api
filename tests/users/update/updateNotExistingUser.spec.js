import { test } from '../../_fixtures/fixtures';

test('Update user with not existing username', async ({
  usersApi,
  profilesApi,
  registeredUser,
}) => {
  const notExistingUsername = `${registeredUser.username}_not_existing`;

  const profileBefore = await profilesApi.getProfile(notExistingUsername);

  await profilesApi.assertResponseCode(profileBefore, 404);

  const response = await usersApi.updateUser({
    ...registeredUser,
    username: notExistingUsername,
  });

  await usersApi.assertSuccessResponseCode(response);

  await usersApi.assertUsernameHasCorrectValue(
    response,
    notExistingUsername,
  );

  const profileAfter = await profilesApi.getProfile(notExistingUsername);

  await profilesApi.assertSuccessResponseCode(profileAfter);
});