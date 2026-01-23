import { test } from '../../_fixtures/fixtures';

test('Read profile of not existing user', async ({ profilesApi }) => {
  const nonExistingUsername = 'nonexistinguser12345xyz';

  const response = await profilesApi.getProfile(nonExistingUsername);

  await profilesApi.assertNotFoundResponseCode(response);
});
