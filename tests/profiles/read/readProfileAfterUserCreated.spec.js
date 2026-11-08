import { test } from '../../_fixtures/fixtures';
import { DEFAULT_IMAGE_LINK } from '../../../src/constants/defaultValues';

async function assertSuccessProfileResponse(profilesApi, response, registeredUser) {
  await profilesApi.assertSuccessResponseCode(response);
  await profilesApi.assertUsernameHasCorrectValue(response, registeredUser.username);
  await profilesApi.assertBioHasCorrectValue(response, null);
  await profilesApi.assertImageHasCorrectValue(response, DEFAULT_IMAGE_LINK);
  await profilesApi.assertFollowingHasValueFalse(response);
}

test(`Read profile after user created`, async ({
  registeredUser,
  profilesApi,
}) => {
  const response = await profilesApi.getProfile(registeredUser.username);

  await assertSuccessProfileResponse(profilesApi, response, registeredUser);
});

test(`Read profile of not existing user`, async ({
  profilesApi,
  newUserData,
}) => {
  const response = await profilesApi.getProfile(newUserData.username);

  await profilesApi.assertNotFoundResponseCode(response);
  await profilesApi.assertTextInResponseBody(response, 'Not Found');
});

test(`Read profile of existing user with empty auth header`, async ({
  profilesApi,
  registeredUser,
}) => {
  const response = await profilesApi.getProfile(registeredUser.username, { headers: { Authorization: '' } });
  await assertSuccessProfileResponse(profilesApi, response, registeredUser);
});