import { test } from '../../_fixtures/fixtures';
import { DEFAULT_IMAGE_LINK } from '../../../src/constants/defaultValues';

test.describe('Unauthorized Read user scenarios', () => {
  test(`Read profile with empty auth token`, async ({
    registeredUser,
    profilesApi,
  }) => {
    const response = await profilesApi.getProfile(registeredUser.username);

    await profilesApi.assertUnauthorizedResponseCode(response);
  });

  test(`Read profile of unknown user`, async ({
    registeredUser,
    profilesApi,
  }) => {
    const response = await profilesApi.getProfile(
      'not_existing_user',
      registeredUser.token,
    );

    await profilesApi.assertNotFoundResponseCode(response);
  });
});
