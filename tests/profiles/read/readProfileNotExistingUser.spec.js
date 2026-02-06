import { test } from '../../_fixtures/fixtures';

test('Read profile of not existing user', async ({ profilesApi }) => {
  const response = await profilesApi.getProfile('not_existing_user_123');

  await profilesApi.assertNotFoundResponseCode(response);
});
