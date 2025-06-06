import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test(`Read profile of not existing user`, async ({ profilesApi }) => {
  const nonExistentUserData = {
    username: faker.internet.username(),
    token: faker.string.uuid(),
  };

  const response = await profilesApi.getProfile(
    nonExistentUserData.username,
    nonExistentUserData.token,
  );

  await profilesApi.assertNotFoundResponseCode(response);
});
