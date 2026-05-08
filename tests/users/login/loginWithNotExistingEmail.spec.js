import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test(`Login with not existing email`, async ({
  registeredUser,
  usersApi,
}) => {
  const {password} = registeredUser;
  const email = faker.internet.email();
  const response = await usersApi.loginUser({email, password});

  await usersApi.assertUnprocessableEntityResponseCode(response);
});