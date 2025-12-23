test.describe('Profile Operations', () => {
  test('Read profile of not existing user', async ({ request }) => {
    const response = await request.get('/api/profiles/nonexisting');
    expect(response.status()).toBe(404);
  });

  test('Read profile of existing user with empty auth header', async ({
    request,
  }) => {
    const response = await request.get('/api/profiles/registeredUser');
    expect(response.status()).toBe(200); // Public info accessible
  });
});
