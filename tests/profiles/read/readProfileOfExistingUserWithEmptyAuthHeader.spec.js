import { test } from '../../_fixtures/fixtures';

test(`Read profile of existing user with emty auth (responce will be 200 OK)`, async ({
  profilesApi,
  registeredUser,
}) => {
  const nonExistingUser = {
    ...registeredUser,
    token: '',
  };
  const response = await profilesApi.getProfile(
    nonExistingUser.username,
    nonExistingUser.token,
  );

  await profilesApi.assertSuccessResponseCode(response);
});
