import { test } from '../../_fixtures/fixtures';

test('Login with wrong formatted email', async ({ newUserData, usersApi }) => {
  newUserData.email = 'yellowsky_ne.me';
  const response = await usersApi.logInUser(newUserData);

  await usersApi.assertUnprocessableEntityResponseCode(response);
});
