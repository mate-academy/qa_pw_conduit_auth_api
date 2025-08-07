import { test, expect } from '../../_fixtures/fixtures';
import { NOT_FOUND_CODE } from '../../../src/api/constants/responceCodes';
import { SUCCESS_CODE } from '../../../src/constants/responceCodes';

test('Read profile of not existing user', async ({
  profilesApi,
  registeredUser,
}) => {
  const response = await profilesApi.getProfile(
    'user_not_exist',
    registeredUser.token,
  );

  expect(response.status()).toBe(NOT_FOUND_CODE);
});

test('Read profile of existing user without auth header', async ({
  profilesApi,
  registeredUser,
}) => {
  const response = await profilesApi.getProfile(registeredUser.username, '');

  expect(response.status()).toBe(SUCCESS_CODE);
  await profilesApi.assertUsernameHasCorrectValue(
    response,
    registeredUser.username,
  );
});
