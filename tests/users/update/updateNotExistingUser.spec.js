import { test } from '../../_fixtures/fixtures';

test(`Update not existing user`, async ({ newUserData, usersApi }) => {
  newUserData['token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
  newUserData['bio'] = 'Updated bio for the user.';
  newUserData['image'] = 'https://example.com/updateduser.jpg';

  const response = await usersApi.updateUser(newUserData);

  await usersApi.assertUnauthorizedResponseCode(response);
});
