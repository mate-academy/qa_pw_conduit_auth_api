import { test } from '../../_fixtures/fixtures';

test(`Read profile of not existing user`, async ({
  registeredUser,
  profilesApi,
}) => {
  const response = await profilesApi.getProfile(
    (registeredUser.username = 'notExisting'),
  );

  await profilesApi.assertNotFoundResponseCode(response);
});
