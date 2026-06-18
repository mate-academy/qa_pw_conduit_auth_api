import { test } from '../../_fixtures/fixtures';
import { UNAUTHORIZED_ERROR_MESSAGE } from '../../../src/constants/authErrorMessages';

test(`Update not existing user`, async ({ registeredUser, usersApi }) => {
  registeredUser['bio'] = 'Updated bio for the user.';
  registeredUser['image'] = 'https://example.com/updateduser.jpg';

  const userDataWithInvalidToken = { 
    ...registeredUser, 
    token: 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTk5OTk5OX0.invalid_signature'
  };
  
  const response = await usersApi.updateUser(userDataWithInvalidToken);

  await usersApi.assertUnauthorizedResponseCode(response);

  await usersApi.assertResponseText(
    response,
    UNAUTHORIZED_ERROR_MESSAGE,
  );
});
