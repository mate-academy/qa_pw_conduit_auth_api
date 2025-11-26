import { test } from '../../_fixtures/fixtures';

test.describe('Unauthorized update user scenarios', () => {
  test(`Update not existing user with expired auth token`, async ({
    registeredUser,
    usersApi,
  }) => {
    registeredUser.token = 'expired_token_or_unknown';

    const response = await usersApi.updateUser(registeredUser);

    await usersApi.assertUnauthorizedResponseCode(response);
  });

  test(`Update user with empty auth token`, async ({
    registeredUser,
    usersApi,
  }) => {
    delete registeredUser.token;

    const response = await usersApi.updateUser(registeredUser);

    await usersApi.assertUnauthorizedResponseCode(response);
  });
});
