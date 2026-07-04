import { test } from '../../_fixtures/fixtures';

test(`Update not existing user`, async ({ registeredUser, usersApi }) => {
  registeredUser.bio = 'Updated bio for the user.';
  registeredUser.image = 'https://example.com/updateduser.jpg';
  
  const response1 = await usersApi.loginUser(registeredUser);
   await usersApi.assertSuccessResponseCode(response1);
   

  const response2 = await usersApi.updateUser('neisnuiuchyiuser12345', registeredUser.token);

  await usersApi.assertUnauthorizedResponseCode(response2);

});