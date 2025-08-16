import { test } from '../../_fixtures/fixtures';
import { NOT_FOUND_TEXT } from '../../../src/constants/authErrorMessages';

test(`Read profile of existing user with emty auth`, async ({
  profilesApi,
  registeredUser,
}) => {
  const nonExistingUser = {
    ...registeredUser,
    token: '',
  };
  const response = await profilesApi.getProfile(
    nonExistingUser.username,
    nonExistingUser.token,
  );

  await profilesApi.assertSuccessResponseCode(response);
});
