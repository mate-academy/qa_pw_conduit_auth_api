import { test } from '../../_fixtures/fixtures';
import { DEFAULT_IMAGE_LINK } from '../../../src/constants/defaultValues';

let username;

test.beforeEach(async ({ usersApi, newUserData }) => {
  const response = await usersApi.registerNewUser(newUserData);

  await usersApi.assertSuccessResponseCode(response);

  await usersApi.assertUsernameHasCorrectValue(response, newUserData.username);

  username = newUserData.username;
});

test(`Read profile of existing user with empty auth header`, async ({
  profilesApi,
}) => {
  const response = await profilesApi.getProfile(username);

  await profilesApi.assertSuccessResponseCode(response);

  await profilesApi.assertUsernameHasCorrectValue(response, username);
  await profilesApi.assertBioHasCorrectValue(response, null);
  await profilesApi.assertImageHasCorrectValue(response, DEFAULT_IMAGE_LINK);
  await profilesApi.assertFollowingHasValueFalse(response);
});
