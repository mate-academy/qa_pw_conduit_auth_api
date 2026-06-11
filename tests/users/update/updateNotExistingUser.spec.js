import { test } from '../../_fixtures/fixtures';

test(`Update not existing user`, async ({ usersApi, newUserData }) => {
  newUserData.token = 'not_existing_token';
  const response = await usersApi.updateUser(newUserData);

  await usersApi.assertUnauthorizedResponseCode(response);
});
