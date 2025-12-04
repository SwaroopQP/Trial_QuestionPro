import { test } from '../fixture/loginFixture';
import { ConfigReader } from '../utils/configReader';
import path from 'path';

const authFile = path.join(process.cwd(), 'storage-state', 'auth.json');

// This test generates an authenticated storage state file that other tests can reuse.
// Run once: `npx playwright test tests/auth.setup.ts --headed` (or headless) to create the file.

test('create auth state file', async ({ loginPage, page }) => {
  await loginPage.goto(ConfigReader.getBaseURL());
  await loginPage.login(ConfigReader.getUsername(), ConfigReader.getPassword());

  // Wait for post-login navigation or element to confirm login succeeded
  // Adjust selector as needed for your app (example uses a dashboard selector)
  await page.waitForTimeout(1000);

  await page.context().storageState({ path: authFile });
});
