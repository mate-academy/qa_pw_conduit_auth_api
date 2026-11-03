import { test } from '../../_fixtures/fixtures';
import { SUCCESS_CODE } from '../../../src/constants/responceCodes';

test('Read profile of existing user with empty auth header', async ({
  registeredUser,
  profilesApi,
}) => {
  const response = await profilesApi.getProfile(registeredUser.username, '');

  await profilesApi.assertResponseCode(response, SUCCESS_CODE);
  await profilesApi.assertUsernameHasCorrectValue(
    response,
    registeredUser.username,
  );
});
