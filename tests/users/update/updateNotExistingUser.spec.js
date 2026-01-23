import { test } from '../../_fixtures/fixtures';
import {
  TEST_USER_BIO,
  TEST_USER_IMAGE,
} from '../../../src/constants/defaultValues';

test('Update not existing user', async ({ newUserData, usersApi }) => {
  newUserData['bio'] = TEST_USER_BIO;
  newUserData['image'] = TEST_USER_IMAGE;
  newUserData['token'] = 'invalid-token-12345';

  const response = await usersApi.updateUser(newUserData);

  await usersApi.assertUnauthorizedResponseCode(response);
});
