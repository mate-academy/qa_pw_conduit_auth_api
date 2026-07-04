import{test} from '../../_fixtures/fixtures';


test(`Login user with wrong formatted email`, async ({ newUserData, usersApi }) => {
 const response = await usersApi.loginUser({  email: 'notanemail', password: 'anypass'});
 await usersApi.assertUnprocessableEntityResponseCode(response);
});
    