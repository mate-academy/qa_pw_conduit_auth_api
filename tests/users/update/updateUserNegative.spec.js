import { expect } from 'allure-playwright';
import { test } from '../../_fixtures/fixtures';

test('Update user with empty auth token', async ({
  usersApi,
  registeredUser,
}) => {
  const updatedData = {
    ...registeredUser,
    bio: 'fail',
    token: '',
  };

  const response = await usersApi.updateUser(updatedData);
  expect(response.status()).toBe(401);
});

test('Updated not exsting user', async ({ usersApi }) => {
  const fakeUser = {
    email: 'non@test.com',
    username: 'test',
    bio: 'test1',
    image: '',
    token: 'token',
  };

  const response = await usersApi.updateUser(fakeUser);
  expect(response.status()).toBe(401);
});
