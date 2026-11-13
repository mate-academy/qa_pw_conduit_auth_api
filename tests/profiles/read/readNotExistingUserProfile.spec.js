import { test } from '../../_fixtures/fixtures';

test('Read profile of not existing user', async ({ 
  profilesApi, 
  newUserData 
}) => {

  const response = await profilesApi.getProfile(newUserData.username);

  await profilesApi.assertResponseCode(response, 404);
});
