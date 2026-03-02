import { test } from '../../_fixtures/fixtures';

test('Read users not existing profile', async ({ profilesApi }) => {
  const response = await profilesApi.getProfile('notexistingusername');

  await profilesApi.assertNotFoundResponseCode(response);
});