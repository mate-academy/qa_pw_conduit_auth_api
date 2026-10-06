import { test } from '../../_fixtures/fixtures';

test(`Read profile of non existing user`, async ({ profilesApi }) => {
  const response = await profilesApi.getProfile(
    'definitely_non_existing_user_987654',
  );

  await profilesApi.assertNotFoundResponseCode(response);
});
