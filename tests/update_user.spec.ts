test.describe('Update User', () => {
  test('Update user with empty auth token', async ({ request }) => {
    const response = await request.put('/api/user', {
      data: { user: { username: 'newusername' } },
    });
    expect(response.status()).toBe(401); // Unauthorized
  });

  test('Update not existing user', async ({ request }) => {
    const response = await request.put('/api/user', {
      headers: { Authorization: `Token invalidtoken` },
      data: { user: { username: 'nonexisting' } },
    });
    expect(response.status()).toBe(401);
  });
});
