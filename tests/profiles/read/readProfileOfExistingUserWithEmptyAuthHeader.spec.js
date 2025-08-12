import { test } from '../../_fixtures/fixtures';

test(`Read profile of existing user with empty auth header`, async ({
  registeredUser,
  profilesApi,
}) => {
  const emptyToken = '';

  const response = await profilesApi.getProfile(
    registeredUser.username,
    emptyToken,
  );

  await profilesApi.assertSuccessResponseCode(response);
});
