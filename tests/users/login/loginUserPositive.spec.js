import { test } from '../../_fixtures/fixtures';

test(`Successfully login for the previously registered user`, async ({
  registeredUser,
  usersApi,
}) => {
  const response = await usersApi.loginUser(registeredUser)

  await usersApi.assertSuccessResponseCode(response);
  await usersApi.assertUsernameHasCorrectValue(
    response,
    registeredUser.username,
  );
  await usersApi.assertEmailHasCorrectValue(response, registeredUser.email);
  await usersApi.assertResponseBodyContainsToken(response);
});
