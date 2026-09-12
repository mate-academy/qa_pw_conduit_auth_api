import { test } from '../../_fixtures/fixtures';
import { NOT_FOUND } from '../../../src/constants/responceCodes';

test('Read profile of not existing user', async ({ profilesApi }) => {
  const response = await profilesApi.getProfile('nonexistent_user_43ss');

  await profilesApi.assertResponseCode(response, NOT_FOUND);
});
