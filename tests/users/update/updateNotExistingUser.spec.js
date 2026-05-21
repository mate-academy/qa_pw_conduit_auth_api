import { test } from '../../_fixtures/fixtures';

test(`Update not existing user`, async ({ 
  newUserData, 
  usersApi, 
}) => {
  const response = await usersApi.updateUser(newUserData);

  await usersApi.assertUnauthorizedResponseCode(response);
});