import { test } from '../../_fixtures/fixtures';

test(`Update user with bio and image`, async ({ registeredUser, usersApi }) => {
  registeredUser['bio'] = 'Updated bio for the user.';
  registeredUser['image'] = 'https://example.com/updateduser.jpg';

  const response = await usersApi.updateUser(registeredUser);

  await usersApi.assertSuccessResponseCode(response);

  await usersApi.assertUsernameHasCorrectValue(
    response,
    registeredUser.username,
  );
  await usersApi.assertEmailHasCorrectValue(response, registeredUser.email);
  await usersApi.assertResponseBodyContainsToken(response);
  await usersApi.assertBioHasCorrectValue(response, registeredUser.bio);
  await usersApi.assertImageHasCorrectValue(response, registeredUser.image);
});

test('Update user with empty auth token', async ({ registeredUser, usersApi }) => {
  const response = await usersApi.updateUser({ ...registeredUser, token: '' });

  await usersApi.assertUnauthorizedResponseCode(response);
  await usersApi.assertTextInResponseBody(response, 'Unauthorized');
});

test('Update user with not existing user', async ({ newUserData, usersApi }) => {
  const response = await usersApi.updateUser({ ...newUserData, id: 999999 });

  await usersApi.assertUnauthorizedResponseCode(response);
  await usersApi.assertTextInResponseBody(response, 'Unauthorized');
});
