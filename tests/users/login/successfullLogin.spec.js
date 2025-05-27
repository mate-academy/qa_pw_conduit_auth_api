import { test } from '../../_fixtures/fixtures';

test.beforeEach(async ({ usersApi, newUserData }) => {
  const response = await usersApi.registerNewUser(newUserData);

  await usersApi.assertSuccessResponseCode(response);
});
  

test('Successful user login', async ({ 
  newUserData: {
    email,
    password,
    username,
  },
  usersApi,
}) => {
  const response = await usersApi.loginUser(
    email,
    password
  );

  await usersApi.assertSuccessResponseCode(response);
  await usersApi.assertEmailHasCorrectValue(response, email);
  await usersApi.assertUsernameHasCorrectValue(response, username);
  await usersApi.assertResponseBodyContainsToken(response);
});