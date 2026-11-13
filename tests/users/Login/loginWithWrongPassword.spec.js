import { test } from '../../_fixtures/fixtures';

test('Login with wrong password', async ({ usersApi, registeredUser }) => {
  const response = await usersApi.loginUser({
    email: registeredUser.email,
    password: 'wrong-password',
  });


  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    'email or password:is invalid',
    'email or password',
  );
});
