import { test } from '../../_fixtures/fixtures';

test(`Read profile of existing user with empty auth header`, async ({
  registeredUser,
  profilesApi,
}) => {
  const response = await profilesApi.getProfile(registeredUser.username, null);

  await profilesApi.assertSuccessResponseCode(response);
});
