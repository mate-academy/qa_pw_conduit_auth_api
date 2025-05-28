import { test as base } from '@playwright/test';
import { UsersApi } from '../../src/api/endpoints/UsersApi';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

export const test = base.extend<{
  usersApi: UsersApi;
  newUserData;
  updateUserData;
  registeredUser;
}>({
  usersApi: async ({ request }, use) => {
    const client = new UsersApi(request);

    await use(client);
  },
  newUserData: async ({ logger }, use) => {
    const userData = generateNewUserData(logger);

    await use(userData);
  },
  registeredUser: async ({ usersApi, newUserData }, use) => {
    const response = await usersApi.registerNewUser(newUserData);

    await usersApi.assertSuccessResponseCode(response);

    newUserData['token'] = await usersApi.parseTokenFromBody(response);

    await use(newUserData);
  },
});
