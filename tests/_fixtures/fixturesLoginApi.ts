import { test as base } from '@playwright/test';
import { LoginApi } from '../../src/api/endpoints/LoginApi';

export const test = base.extend<{
  loginApi;
}>({
  loginApi: async ({ request }, use) => {
    const client = new LoginApi(request);

    await use(client);
  },
});
