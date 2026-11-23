import { test } from '../../_fixtures/fixtures';

test('Read profile after user created', async ({
  registeredUser,
  profilesApi,
}) => {
  const response = await profilesApi.getProfile(registeredUser.username);

  await profilesApi.assertSuccessResponseCode(response);

  await profilesApi.assertUsernameHasCorrectValue(
    response,
    registeredUser.username,
  );

  await profilesApi.assertBioHasCorrectValue(response, null);

  await profilesApi.assertImageHasCorrectValue(
    response,
    '/images/smiley-cyrus.jpg',
  );

  await profilesApi.assertFollowingHasValueFalse(response);
});
