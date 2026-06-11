import { test } from '../../_fixtures/fixtures';

test(`Read profile of not existing user`, async ({ profilesApi }) => {
  const username = 'username_of_not_existing_user';
  const response = await profilesApi.getProfile(username);

  await profilesApi.assertNotFoundResponseCode(response);
});
