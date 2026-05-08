import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test(`Login with wrong password`, async ({
  registeredUser,
  usersApi,
}) => {
  const {email} = registeredUser;
  const password = faker.internet.password();
  const response = await usersApi.loginUser({email, password});

  await usersApi.assertUnprocessableEntityResponseCode(response);
});