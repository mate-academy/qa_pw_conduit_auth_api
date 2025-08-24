import { test } from '../../_fixtures/fixtures';
import { NOT_FOUND, SUCCESS_CODE } from '../../../src/constants/responceCodes';


test.describe('Different read user flows', () => {

  test(
    `Read profile of not existing user`,
    async ({ registeredUser, profilesApi }) => {
      const notExistingUsername = 'not_existing_user_name';
      const response = await profilesApi.getProfile(
        notExistingUsername,
        registeredUser.token
      );
      await profilesApi.assertResponseCode(response, NOT_FOUND);
  });

  test(
    `Read profile of existing user with empty auth header`,
    async ({ registeredUser, profilesApi }) => {
      registeredUser.token = '';
      const response = await profilesApi.getProfile(
        registeredUser.username,
        registeredUser.token
        );
      await profilesApi.assertResponseCode(response, SUCCESS_CODE);
  });

})
