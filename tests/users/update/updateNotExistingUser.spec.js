import { WITHOUT_TOKEN } from '../../../src/constants/authErrorMessages';
import { test } from '../../_fixtures/fixtures';

test('Update not existing user', async ({ usersApi, newUserData }) => {
  const response = await usersApi.updateUser(newUserData);

  await usersApi.assertUnauthorizedResponseCode(response);
  await usersApi.assertText(response, WITHOUT_TOKEN);
});
