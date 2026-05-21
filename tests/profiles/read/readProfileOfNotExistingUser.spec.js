import { test } from '../../_fixtures/fixtures';

test(`Read profile of not existing user`, async ({
  newUserData,
  profilesApi,
}) => {
  const response = await profilesApi.getProfile(newUserData.username);

  await profilesApi.assertNotFoundResponseCode(response);
});