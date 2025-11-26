import { test } from '../../_fixtures/fixtures';
import { DEFAULT_IMAGE_LINK } from '../../../src/constants/defaultValues';

test.describe('Read user profile scenarios', () => {

  test(`Read profile with empty auth token`, async ({
    registeredUser,
    profilesApi,
  }) => {
    // Since Get Profile is public, should succeed without auth
    const response = await profilesApi.getProfile(registeredUser.username);
    await profilesApi.assertSuccessResponseCode(response);

    // Optional: verify returned username matches
    const data = await response.json();
    expect(data.username).toBe(registeredUser.username);
  });

  test(`Read profile of unknown user`, async ({
    registeredUser,
    profilesApi,
  }) => {
    const response = await profilesApi.getProfile(
      'not_existing_user',
      registeredUser.token
    );

    await profilesApi.assertNotFoundResponseCode(response);
  });
});
