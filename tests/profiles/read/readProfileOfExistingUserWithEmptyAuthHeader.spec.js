import { test } from '../../_fixtures/fixtures';
import { DEFAULT_IMAGE_LINK } from '../../../src/constants/defaultValues';
import { UNAUTHORIZED } from '../../../src/constants/responceCodes';

test(`Read profile of existing user with empty auth header`, async ({
  registeredUser,
  profilesApi,
}) => {
  registeredUser.token = '';
  const response = await profilesApi.getProfile(
    registeredUser.username,
    registeredUser.token,
  );

  await profilesApi.assertSuccessResponseCode(response);
});
