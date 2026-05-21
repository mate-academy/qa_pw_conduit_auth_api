import { test } from '../../_fixtures/fixtures';
import { UNDEFINED_PASSWORD } from '../../../src/constants/authErrorMessages';

test(`Update user with empty auth token`,
  async ({ registeredUser, usersApi }) => {
    registeredUser['token'] = '';
    registeredUser['bio'] = 'Updated bio for the user.';
    registeredUser['image'] = 'https://example.com/updateduser.jpg';

    const response = await usersApi.updateUser(registeredUser);

    await usersApi.assertUnauthorizedResponseCode(response);
  });
