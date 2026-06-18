import { test } from '../../_fixtures/fixtures';
import { UNAUTHORIZED_ERROR_MESSAGE } from '../../../src/constants/authErrorMessages';

test(`Update user without auth token`, async ({ registeredUser, usersApi }) => {
  registeredUser['bio'] = 'Updated bio for the user.';
  registeredUser['image'] = 'https://example.com/updateduser.jpg';

  const userDataWithEmptyToken = { ...registeredUser, token: '' };
  const response = await usersApi.updateUser(userDataWithEmptyToken);

  await usersApi.assertUnauthorizedResponseCode(response);
  await usersApi.assertResponseText(response, UNAUTHORIZED_ERROR_MESSAGE);
});
