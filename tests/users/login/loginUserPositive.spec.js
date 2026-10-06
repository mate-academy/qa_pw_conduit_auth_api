import { test } from '../../_fixtures/fixtures';

test.beforeEach(async ({ usersApi, newUserData }) => {
  await usersApi.registerNewUser(newUserData);
});

test(`Successful user login`, async ({ usersApi, newUserData }) => {
  const response = await usersApi.loginUser(
    newUserData.email,
    newUserData.password,
  );

  await usersApi.assertResponseBodyContainsToken(response);
});
