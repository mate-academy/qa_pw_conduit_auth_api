import{test} from '../../_fixtures/fixtures';


test(`Login user with not existing email`, async ({ newUserData, usersApi }) => {
 const response = await usersApi.loginUser({ email: 'nonexistent@test.com', password: 'anypass' });
 await usersApi.assertUnprocessableEntityResponseCode(response);


})