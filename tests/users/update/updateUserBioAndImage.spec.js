import { test } from '../../_fixtures/fixtures';
import {
  TEST_USER_BIO,
  TEST_USER_IMAGE,
} from '../../../src/constants/defaultValues';

test(`Update user with bio and image`, async ({ registeredUser, usersApi }) => {
  registeredUser['bio'] = TEST_USER_BIO;
  registeredUser['image'] = TEST_USER_IMAGE;

  const response = await usersApi.updateUser(registeredUser);

  await usersApi.assertSuccessResponseCode(response);

  await usersApi.assertUsernameHasCorrectValue(
    response,
    registeredUser.username,
  );
  await usersApi.assertEmailHasCorrectValue(response, registeredUser.email);
  await usersApi.assertResponseBodyContainsToken(response);
  await usersApi.assertBioHasCorrectValue(response, registeredUser.bio);
  await usersApi.assertImageHasCorrectValue(response, registeredUser.image);
});
