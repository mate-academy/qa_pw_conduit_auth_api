import { UNAUTHORIZED } from '../../../src/constants/responceCodes';
import { test } from '../../_fixtures/fixtures';


test(`Update user with empty auth token`, async ({ usersApi, newUserData }) => {
  const response = await usersApi.updateUser(newUserData);

  await usersApi.assertResponseCode(response, UNAUTHORIZED);
});
