import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput = '#EmailAddress';
  readonly passwordInput = '#Password';
  readonly loginButton = 'button:has-text("Log In")';
  readonly welcomeHeader = 'h1';

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async fillEmail(email: string) {
    await this.page.locator(this.emailInput).fill(email);
  }

  async fillPassword(password: string) {
    await this.page.locator(this.passwordInput).fill(password);
  }

  async clickLogin() {
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }

  async validateWelcomeMessage(expectedMessage: string) {
    await expect(this.page.locator(this.welcomeHeader)).toHaveText(expectedMessage);
  }

  async isEmailFieldVisible() {
    return await this.page.locator(this.emailInput).isVisible();
  }

  async isPasswordFieldVisible() {
    return await this.page.locator(this.passwordInput).isVisible();
  }

  async isLoginButtonVisible() {
    return await this.page.getByRole('button', { name: 'Log In' }).isVisible();
  }

  async login(email: string, password: string) {
    await this.isEmailFieldVisible()
    await this.fillEmail(email);
    await this.isPasswordFieldVisible();
    await this.fillPassword(password);
    await this.isLoginButtonVisible();
    await this.clickLogin();
  }
}
