import { test } from '../../_fixtures/fixtures.js';
import { expect } from '@playwright/test';

test('Read profile of not existing user', async ({ profilesApi }) => {
  const username = `no_user_${Date.now()}`;
  const response = await profilesApi.getProfile(username);

  expect(response.status()).toBe(404);
  const ct = response.headers()['content-type'] || '';
  if (ct.includes('application/json')) {
    const body = await profilesApi.parseBody(response);
    const raw = body?.errors?.profile ?? body?.errors?.message ?? body?.message;
    if (raw !== undefined) {
      const msgs = Array.isArray(raw) ? raw : [String(raw)];
      expect(msgs.join(' ').toLowerCase()).toContain('not found');
    }
  }
});

test('Read profile of existing user with empty auth header', async ({ profilesApi, registeredUser }) => {
  const response = await profilesApi.request.get(
    `/api/profiles/${registeredUser.username}`,
    { headers: { 'content-type': 'application/json', authorization: 'Token ' } }
  );

  expect(response.status()).toBe(200);
  await profilesApi.assertUsernameHasCorrectValue(response, registeredUser.username);
  await profilesApi.assertFollowingHasValueFalse(response);
});
