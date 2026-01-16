import { WITHOUT_TOKEN } from '../../../src/constants/authErrorMessages';
import { test } from '../../_fixtures/fixtures';

test('Update user with empty token', async ({ usersApi, registeredUser }) => {
  const invalidUser = {
    ...registeredUser,
    token: '',
  };

  const response = await usersApi.updateUser(invalidUser);

  await usersApi.assertUnauthorizedResponseCode(response);
  await usersApi.assertText(response, WITHOUT_TOKEN);
});
