import { test } from '../../_fixtures/fixtures';

test('Update user that does not exist', async ({
  usersApi,
  registeredUser,
}) => {
  const nonExistingUser = {
    ...registeredUser,
    email: 'notexisting@email.com',
    username: 'notexistingusername',
  };

  const response = await usersApi.updateUser(nonExistingUser);

  await usersApi.assertNotFoundResponseCode(response);
});