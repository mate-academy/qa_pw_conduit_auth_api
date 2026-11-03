import { test } from '../../_fixtures/fixtures';

test.beforeEach(async ({ newUserData, usersApi }) => {
  const response = await usersApi.registerNewUser(newUserData);

  await usersApi.assertSuccessResponseCode(response);
});

test('Successfull login for the previosuly regsitered user', async ({
  newUserData,
  usersApi,
}) => {
  const response = await usersApi.loginUser(newUserData);

  await usersApi.assertSuccessResponseCode(response);
  await usersApi.assertBodyHasToken(response);
});
