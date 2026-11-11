import { test } from '../../_fixtures/fixtures';

test('Login with wrong formatted email', async ({ usersApi, newUserData }) => {
  const response = await usersApi.loginUser({
    email: 'wrong-email',
    password: newUserData.password,
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    'email or password:is invalid',
    'email or password',
  );
});
