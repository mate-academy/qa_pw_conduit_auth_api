import { test } from '../../_fixtures/fixtures';

test(`Login with wrong password`, async ({
  registeredUser,
  usersApi,
}) => {
  const userWithWrongEmail = {
    email: registeredUser.email,
    password: 'wrongpassword',
  };

  const response = await usersApi.loginUser(userWithWrongEmail);

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    'email or password:is invalid',
    'email or password',
  );
});
