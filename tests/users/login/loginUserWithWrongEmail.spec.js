import { test } from '../../_fixtures/fixtures';

test(`Login with wrong formatted email`, async ({
  registeredUser,
  usersApi,
}) => {

  const userWithWrongEmail = {
    email: 'wrongemailformat',
    password: registeredUser.password,
  };

  const response = await usersApi.loginUser(userWithWrongEmail);

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    'email or password:is invalid',
    'email or password',
  );
});
