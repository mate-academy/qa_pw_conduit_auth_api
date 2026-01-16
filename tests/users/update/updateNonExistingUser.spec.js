import { UNAUTHORIZED } from '../../../src/constants/responceCodes';
import { test } from '../../_fixtures/fixtures';

const nonExistingToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODM4OTOpCgni6LDu2ik2NDdX-viU';


test(`Update non existing user`, async ({ usersApi, registeredUser }) => {
  registeredUser.token = nonExistingToken;
  const response = await usersApi.updateUser(registeredUser);

  await usersApi.assertResponseCode(response, UNAUTHORIZED);
});
