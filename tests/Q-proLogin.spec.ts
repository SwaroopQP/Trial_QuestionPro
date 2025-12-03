import { test, expect } from '@playwright/test';

test('has title and h1 message', async ({ page }) => {
  await page.goto('https://www.questionpro.com/a/showLogin.do');


  // Validate the <h1> message is exactly the expected text
  const header = page.locator('h1');
  await expect(header).toHaveText('Welcome Back! Please log in');
});