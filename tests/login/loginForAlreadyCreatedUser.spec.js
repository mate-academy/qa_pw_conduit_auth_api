import { test } from '../_fixtures/fixtures';
import { SUCCESS_CODE } from '../../src/constants/responceCodes';

test('Successful login after user registration', async ({
  usersApi,
  registeredUser,
}) => {
  // Сохраняем ответ от API в переменную
  const response = await usersApi.loginUser(registeredUser);

  // Передаем response вместо registeredUser в методы проверки
  await usersApi.assertEmailHasCorrectValue(response, registeredUser.email);
  await usersApi.assertUsernameHasCorrectValue(
    response,
    registeredUser.username,
  );
  await usersApi.assertResponseCode(response, SUCCESS_CODE);
});
