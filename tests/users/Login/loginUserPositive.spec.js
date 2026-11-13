import { test } from '../../_fixtures/fixtures';

test('Successful login for previously registered user', async ({
  registeredUser, 
  usersApi 
}) => {

  const response = await usersApi.loginUser(registeredUser);

  await usersApi.assertSuccessResponseCode(response);
  
  await usersApi.assertEmailHasCorrectValue(response, registeredUser.email);
  await usersApi.assertUsernameHasCorrectValue( 
    response, 
    registeredUser.username
  );

  await usersApi.assertResponseBodyContainsToken(response);
});
