import{test} from '../../_fixtures/fixtures';

test(`Read profile of existing user with empty auth header`, async ({ registeredUser, usersApi, profilesApi }) => {
   const response1 = await usersApi.loginUser(registeredUser);
   await usersApi.assertSuccessResponseCode(response1);

   const invalidUserData = {
    ...registeredUser,
    token: ' ' 
  };
   
   const response2 = await profilesApi.getProfile(invalidUserData);
   await profilesApi.assertNotFoundResponseCode(response2);
    


});