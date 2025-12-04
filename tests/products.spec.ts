import fs from 'fs';
import path from 'path';
import { test as base, expect } from '../fixture/loginFixture';
import { ConfigReader } from '../utils/configReader';
import { ProductsPage } from '../Pages/ProductsPage';

const authFile = path.join(process.cwd(), 'storage-state', 'auth.json');

// If an auth storage-state exists, reuse it for this test run
if (fs.existsSync(authFile)) {
  base.use({ storageState: authFile });
}

const test = base;

// Single TDD-style test that will reuse auth state if present; otherwise it logs in and saves state.
test('open products and select Employee Experience', async ({ loginPage, page }) => {
  const products = new ProductsPage(page);

  // If auth file doesn't exist, perform login and save it for future runs
  if (!fs.existsSync(authFile)) {
    await loginPage.goto(ConfigReader.getBaseURL());
    await loginPage.validateWelcomeMessage('Welcome Back! Please log in');
    await loginPage.login(ConfigReader.getUsername(), ConfigReader.getPassword());
    // Wait for post-login navigation
    await page.waitForTimeout(1000);
    // Ensure storage-state dir exists
    fs.mkdirSync(path.dirname(authFile), { recursive: true });
    await page.context().storageState({ path: authFile });
  } else {
    // If storage-state exists, just navigate to base or products page
    await page.goto(ConfigReader.getBaseURL());
  }

  // Open products list, hover and click the product
  const productName = 'Employee Experience';
  await products.clickMenuHoverAndClickListProduct(productName);

  // Validate we've opened the product page
  await products.isNewStudyVisible();
});

