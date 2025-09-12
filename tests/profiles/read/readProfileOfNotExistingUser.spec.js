import { test } from '../../_fixtures/fixtures';

test(`Read profile of not existing user`, async ({
  registeredUser,
  profilesApi,
}) => {
  const nonExistingUsername = 'user_that_does_not_exist_12345';

  const response = await profilesApi.getProfile(
    nonExistingUsername,
    registeredUser.token,
  );

  await profilesApi.assertNotFoundResponseCode(response);
});
