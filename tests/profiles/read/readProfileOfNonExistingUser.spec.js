import { test } from '../../_fixtures/fixtures';
import { DEFAULT_IMAGE_LINK } from '../../../src/constants/defaultValues';
import { NOT_FOUND } from '../../../src/constants/responceCodes';

const testUsername = 'nonExistingUser';

test(`Read profile of non existing user`, async ({
  registeredUser,
  profilesApi,
}) => {
  const response = await profilesApi.getProfile(
    testUsername,
    registeredUser.token,
  );

  await profilesApi.assertResponseCode(response, NOT_FOUND);
});
