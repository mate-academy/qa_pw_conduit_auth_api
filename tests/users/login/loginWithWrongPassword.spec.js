import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';
import { test } from '../../_fixtures/fixtures';

const wrongPassword = 'Testpass123!';

test.beforeEach(async ({ usersApi, newUserData }) => {
  const response = await usersApi.registerNewUser(newUserData);

  await usersApi.assertSuccessResponseCode(response);
});
  

test('Login with wrong password', async ({ 
  newUserData: { 
    email 
  }, 
  usersApi 
}) => {
  const response = await usersApi.loginUser(
    email,
    wrongPassword,
  );

  await usersApi.assertResponseCode(response, 422);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});