import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test(`Update not existing user`, async ({ usersApi }) => {
  const nonExistentUserData = {
    email: faker.internet.email(),
    username: faker.internet.username(),
    token: faker.string.uuid(),
  };

  const response = await usersApi.updateUser(nonExistentUserData);

  await usersApi.assertUnauthorizedResponseCode(response);
});
