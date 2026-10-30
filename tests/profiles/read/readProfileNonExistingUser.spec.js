import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test(`Read profile of not existing user`, async ({ profilesApi }) => {
  const fakeUserName = faker.person.firstName();
  const response = await profilesApi.getProfile(fakeUserName);

  await profilesApi.assertNotFoundResponseCode(response);
});
