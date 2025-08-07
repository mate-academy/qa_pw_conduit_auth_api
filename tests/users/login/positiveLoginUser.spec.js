import { test } from '../../_fixtures/fixtures';

test('Successful login for previously registered user', async ({
  usersApi,
  registeredUser,
}) => {
  const credentials = {
    email: registeredUser.email,
    password: registeredUser.password,
  };

  const response = await usersApi.loginUser(credentials);

  await usersApi.assertSuccessResponseCode(response);
  await usersApi.assertResponseBodyContainsToken(response);
  await usersApi.assertEmailHasCorrectValue(response, registeredUser.email);
});
