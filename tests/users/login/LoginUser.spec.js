import { test } from '../../_fixtures/fixtures';
import {
  WRONG_FORMATED_EMAIL,
  EXISTING_EMAIL
} from '../../../src/constants/emails';


test.describe('Different users login flows', () => {

  test(
    'Successful login for the previously registered user',
    async ({ registeredUser, usersApi }) => {
      const { email, username } = await registeredUser
      const response = await usersApi.loginUser(registeredUser);

      await usersApi.assertSuccessResponseCode(response);
      await usersApi.assertUsernameHasCorrectValue(response, username);
      await usersApi.assertEmailHasCorrectValue(response, email);
      await usersApi.assertResponseBodyContainsToken(response);
    });

  test(
    'Login with not existing email',
    async ({ registeredUser, usersApi }) => {
      registeredUser['email'] = EXISTING_EMAIL;

      const response = await usersApi.loginUser(registeredUser);

      await usersApi.assertUnprocessableEntityResponseCode(response);
    });

  test(
    'Login with wrong formatted email',
    async ({ registeredUser, usersApi }) => {
      registeredUser['email'] = WRONG_FORMATED_EMAIL;

      const response = await usersApi.loginUser(registeredUser);

      await usersApi.assertUnprocessableEntityResponseCode(response);
    });

  test(
    'Login with wrong formatted password',
    async ({ registeredUser, usersApi }) => {
      const wrongPart = 'WRONG!'
      registeredUser['password'] = registeredUser['password'] + wrongPart;
      const response = await usersApi.loginUser(registeredUser);

      await usersApi.assertUnprocessableEntityResponseCode(response);
    });

})
