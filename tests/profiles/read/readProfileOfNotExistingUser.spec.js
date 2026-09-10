import { test } from '../../_fixtures/fixtures';

test(`Read profile of not existing user`, async ({
  registeredUser,
  profilesApi,
}) => {
  const notExistingUsername = (registeredUser.username = 'notExisting');

  const response = await profilesApi.getProfile(notExistingUsername);

  await profilesApi.assertNotFoundResponseCode(response);
});
