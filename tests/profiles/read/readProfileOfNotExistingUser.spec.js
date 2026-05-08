import { test } from '../../_fixtures/fixtures';
import { DEFAULT_IMAGE_LINK } from '../../../src/constants/defaultValues';

test(`Read profile of not existing user`, async ({
  newUserData,
  profilesApi,
}) => {
  const response = await profilesApi.getProfile(newUserData.username);

  await profilesApi.assertNotFoundResponseCode(response);
});
