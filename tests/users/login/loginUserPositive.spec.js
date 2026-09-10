import { test } from '../../_fixtures/fixtures';

test('Successfull login for the previosuly regsitered user', async ({
  registeredUser,
  loginApi,
}) => {
  const response = await loginApi.loginUser(
    registeredUser.email,
    registeredUser.password,
  );

  await loginApi.assertSuccessResponseCode(response);
  await loginApi.assertResponseBodyContainsToken(response);
});
