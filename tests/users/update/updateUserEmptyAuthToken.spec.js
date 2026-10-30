import { test } from '../../_fixtures/fixtures';

test(`Update user with empty auth token`, async ({
  registeredUser,
  usersApi,
}) => {
  registeredUser['token'] = '';

  const response = await usersApi.updateUser(registeredUser);

  await usersApi.assertUnauthorizedResponseCode(response);
});
