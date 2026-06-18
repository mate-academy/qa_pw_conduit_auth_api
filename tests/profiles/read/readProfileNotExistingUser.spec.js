import { test } from '../../_fixtures/fixtures';
import { NOT_FOUND } from '../../../src/constants/profileErrorMessages';

test(`Read profile of not existing user`, async ({
  registeredUser,
  profilesApi,
}) => {
  const notExistingUsername = 'notexistinguser';
  const response = await profilesApi.getProfile(notExistingUsername);

  await profilesApi.assertNotFoundResponseCode(response);

  await profilesApi.assertResponseText(
    response,
    NOT_FOUND,
  );
});
