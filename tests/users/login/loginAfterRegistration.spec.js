import { test } from '../../_fixtures/fixtures';

test('Successfull login for the previosuly regsitered user', async ({
  registeredUser,
  usersApi,
}) => {
  delete registeredUser.token;
  const response = await usersApi.logInUser(registeredUser);

  await usersApi.assertSuccessResponseCode(response);

  await usersApi.assertUsernameHasCorrectValue(
    response,
    registeredUser.username,
  );
  await usersApi.assertEmailHasCorrectValue(response, registeredUser.email);
  await usersApi.assertResponseBodyContainsToken(response);
});
