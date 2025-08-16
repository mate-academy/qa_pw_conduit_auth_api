import { test } from '../_fixtures/fixtures';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../src/constants/authErrorMessages';

test('Login with non-existing email should fail', async ({
  usersApi,
  registeredUser,
}) => {
  // Создаем данные с несуществующим email
  const invalidUser = {
    ...registeredUser,
    email: 'nonexistent@mail.com',
  };

  // Пытаемся залогиниться с неверным email
  const response = await usersApi.loginUser(invalidUser);

  // Проверяем что получили ошибку
  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
  );
});
