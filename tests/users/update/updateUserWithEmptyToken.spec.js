import { test } from '../../_fixtures/fixtures';
import {
  TEST_USER_BIO,
  TEST_USER_IMAGE,
} from '../../../src/constants/defaultValues';

test('Update user with empty auth token', async ({
  registeredUser,
  usersApi,
}) => {
  registeredUser['bio'] = TEST_USER_BIO;
  registeredUser['image'] = TEST_USER_IMAGE;

  const response = await usersApi.updateUserWithEmptyToken(registeredUser);

  await usersApi.assertUnauthorizedResponseCode(response);
});
