import { test } from '../../_fixtures/fixtures';

test(`Login with not existing email`, async ({ newUserData, usersApi }) => {
  const response = await usersApi.loginUser(newUserData);

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    'email or password:is invalid',
    'email or password',
  );
});
