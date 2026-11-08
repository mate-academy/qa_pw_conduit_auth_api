import { test } from '../../_fixtures/fixtures';

test('Successful login of registered user', async ({ registeredUser, usersApi }) => {
  const response = await usersApi.loginUser(registeredUser);

  await usersApi.assertSuccessResponseCode(response);

  await usersApi.assertResponseBodyContainsToken(response);
});

test('Login with not existing email', async ({ registeredUser, usersApi }) => {
  const u = { ...registeredUser, email: 'notexisting@email.com' };
  console.log(u);
  const response = await usersApi.loginUser();

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(response, 'email:undefined', 'email');
});

test('Login with wrong formatted email', async ({ registeredUser, usersApi }) => {
  const response = await usersApi.loginUser({ ...registeredUser, email: 'wrongformattedemail' });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(response, 'email:undefined', 'email');
});