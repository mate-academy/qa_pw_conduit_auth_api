import { test } from '../../_fixtures/fixtures';

test(`Successfully login for previously registered user`, async ({
  registeredUser,
  usersApi,
}) => {
  const response = await usersApi.login(registeredUser);

  await usersApi.assertSuccessResponseCode(response);

  await usersApi.assertUsernameHasCorrectValue(
    response,
    registeredUser.username,
  );
  await usersApi.assertEmailHasCorrectValue(
    response,
    registeredUser.email,
  );
  await usersApi.assertBioHasCorrectValue(response, null);
  await usersApi.assertImageHasCorrectValue(response, null);
  await usersApi.assertResponseBodyContainsToken(response);
});
