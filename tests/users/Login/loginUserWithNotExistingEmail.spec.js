import { test } from '../../_fixtures/fixtures';

test ('Login with not existing email', async ({ usersApi, newUserData }) => {
  const response = await usersApi.loginUser({
    email: newUserData.email,
    password: newUserData.password,
  });
  
  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    'email or password:is invalid',
    'email or password'
  );
});
