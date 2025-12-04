import { test as base } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

type LoginTestFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<LoginTestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
