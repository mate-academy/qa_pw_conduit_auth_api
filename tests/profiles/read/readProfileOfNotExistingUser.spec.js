import { test } from '../../_fixtures/fixtures';
import { NOT_FOUND_TEXT } from '../../../src/constants/authErrorMessages';

test(`Read profile of not existing user`, async ({
  profilesApi,
  registeredUser,
}) => {
  const nonExistingUser = {
    ...registeredUser,
    username: 'NonExistingUser',
  };
  const response = await profilesApi.getProfile(
    nonExistingUser.username,
    nonExistingUser.token,
  );

  await profilesApi.assertNotFoundResponseCode(response);
  await profilesApi.assertText(response, NOT_FOUND_TEXT);
});
