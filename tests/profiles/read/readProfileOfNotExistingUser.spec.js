import { test } from '../../_fixtures/fixtures';
import { NOT_FOUND_CODE } from '../../../src/constants/responceCodes';

test('Read profile of not existing user', async ({
  newUserData,
  profilesApi,
}) => {
  const response = await profilesApi.getProfile(newUserData.username);

  await profilesApi.assertResponseCode(response, NOT_FOUND_CODE);
});
