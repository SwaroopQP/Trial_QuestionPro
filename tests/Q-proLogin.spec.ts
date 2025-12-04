import { test, expect } from '../fixture/loginFixture';
import { ConfigReader } from '../utils/configReader';

test('should successfully login with valid credentials @critical', async ({ loginPage, page }) => {
  // Navigate to login page then use the shared `login()` helper directly
  await loginPage.goto(ConfigReader.getBaseURL());
  await loginPage.login(ConfigReader.getUsername(), ConfigReader.getPassword());

});