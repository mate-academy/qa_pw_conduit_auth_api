import { test, expect } from '@playwright/test';
import { apiClient } from '../utils/apiClient'; // optional helper for API requests

test.describe('Login User', () => {
  test('Successful login for registered user', async ({ request }) => {
    const response = await request.post('/api/users/login', {
      data: {
        user: { email: 'registered@example.com', password: 'password123' },
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.user.token).toBeTruthy();
  });

  test('Login with non-existing email', async ({ request }) => {
    const response = await request.post('/api/users/login', {
      data: {
        user: { email: 'notfound@example.com', password: 'password123' },
      },
    });
    expect(response.status()).toBe(422);
  });

  test('Login with wrongly formatted email', async ({ request }) => {
    const response = await request.post('/api/users/login', {
      data: { user: { email: 'invalidemail', password: 'password123' } },
    });
    expect(response.status()).toBe(422);
  });

  test('Login with wrong password', async ({ request }) => {
    const response = await request.post('/api/users/login', {
      data: {
        user: { email: 'registered@example.com', password: 'wrongpass' },
      },
    });
    expect(response.status()).toBe(422);
  });
});
