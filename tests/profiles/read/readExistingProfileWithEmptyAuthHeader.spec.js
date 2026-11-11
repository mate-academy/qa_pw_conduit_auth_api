import { test } from '../../_fixtures/fixtures';

test('Read profile of existing user with empty auth header', async ({
  profilesApi,
  registeredUser,
}) => {
  const response = await profilesApi.getProfile(
    registeredUser.username,
    {
      'content-type': 'application/json',
      authorization: '',
    },
  );

  await profilesApi.assertSuccessResponseCode(response);

  await profilesApi.assertUsernameHasCorrectValue(
    response,
    registeredUser.username,
  );
});
