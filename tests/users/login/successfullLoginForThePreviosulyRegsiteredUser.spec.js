import { test } from '../../_fixtures/fixtures';

test(`Successfull login for the previosuly regsitered user`, async ({
  registeredUser,
  usersApi,
}) => {
  const {email, password} = registeredUser;
  const response = await usersApi.loginUser({email, password});

  await usersApi.assertSuccessResponseCode(response);
});