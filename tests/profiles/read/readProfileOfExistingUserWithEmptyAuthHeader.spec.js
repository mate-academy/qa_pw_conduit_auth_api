import { test } from '../../_fixtures/fixtures';
import { DEFAULT_IMAGE_LINK } from '../../../src/constants/defaultValues';

test(`Read profile of existing user with empty auth header`, async ({
  registeredUser,
  profilesApi,
}) => {
  registeredUser['token'] = '';
  const response = await profilesApi.getProfile(registeredUser.username);

  await profilesApi.assertSuccessResponseCode(response);

  await profilesApi.assertUsernameHasCorrectValue(
    response,
    registeredUser.username,
  );
  await profilesApi.assertBioHasCorrectValue(response, null);
  await profilesApi.assertImageHasCorrectValue(response, DEFAULT_IMAGE_LINK);
  await profilesApi.assertFollowingHasValueFalse(response);
});
