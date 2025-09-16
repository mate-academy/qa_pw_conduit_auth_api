import { test } from '../../_fixtures/fixtures.js';

test('Successful login for previously registered user', async ({ usersApi, registeredUser }) => {
  const res = await usersApi.loginUser({ email: registeredUser.email, password: registeredUser.password });
  await usersApi.assertSuccessResponseCode(res);
  await usersApi.assertEmailHasCorrectValue(res, registeredUser.email);
  await usersApi.assertUsernameHasCorrectValue(res, registeredUser.username);
  await usersApi.assertResponseBodyContainsToken(res);
});

test.describe('Login – negative scenarios (same response for all)', () => {
  test('non-existing email', async ({ usersApi, newUserData }) => {
    const res = await usersApi.loginUser({ email: `no_${newUserData.email}`, password: newUserData.password });
    await usersApi.assertInvalidCredentials(res); // 422 + "...invalid..."
  });

  test('wrong password', async ({ usersApi, registeredUser }) => {
    const res = await usersApi.loginUser({ email: registeredUser.email, password: registeredUser.password + '_wrong' });
    await usersApi.assertInvalidCredentials(res);
  });

  test('wrong formatted email', async ({ usersApi, newUserData }) => {
    const res = await usersApi.loginUser({ email: 'wrong-format', password: newUserData.password });
    await usersApi.assertInvalidCredentials(res); // <- same contract in this API
  });
});
