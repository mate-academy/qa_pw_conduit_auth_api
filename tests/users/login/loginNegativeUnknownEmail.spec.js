import { test } from '../../_fixtures/fixtures';

test('Login with not existing email', async ({ newUserData, usersApi }) => {
  newUserData.email = 'yellowsky@ne.me';
  const response = await usersApi.logInUser(newUserData);

  await usersApi.assertUnprocessableEntityResponseCode(response);
});
