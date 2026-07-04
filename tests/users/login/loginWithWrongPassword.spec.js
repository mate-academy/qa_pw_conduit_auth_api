import{test} from '../../_fixtures/fixtures';


test(`Login user with wrong password`, async ({ newUserData, usersApi }) => {
 const response = await usersApi.loginUser({  email: 'nonexistent@test.com', password: 'wrongpassword'});
 await usersApi.assertUnprocessableEntityResponseCode(response);
});
    