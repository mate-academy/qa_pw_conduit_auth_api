import{test} from '../../_fixtures/fixtures';


test(`Login user positive`, async ({ newUserData, usersApi }) => {
   const response1 = await usersApi.registerNewUser(newUserData);
   await usersApi.assertSuccessResponseCode(response1);

   const response2 = await usersApi.loginUser(newUserData);
   await usersApi.assertSuccessResponseCode(response2);
   await usersApi.assertUsernameHasCorrectValue(response2, newUserData.username);
   await usersApi.assertEmailHasCorrectValue(response2, newUserData.email);
   await usersApi.assertResponseBodyContainsToken(response2);


});
