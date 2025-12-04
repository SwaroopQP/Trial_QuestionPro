import { Page, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  // Update these selectors to match your application's real DOM if needed.
  readonly productsMenuSelector = "span.text:visible";
  readonly productsListSelector= "//li[contains(@class,'workforce')]//span[@class='shadow-box']";
  // Prefer role-based locator for the final product link; fallback to text-based if needed
  readonly productLink = (name: string) => this.page.getByRole('link', { name }) || this.page.locator(`a:has-text("${name}")`);
  readonly newStudy = '#createNewFlashletSurveyFramework2';

  constructor(page: Page) {
    this.page = page;
  }

  async openProductsList() {
    // Try clicking a top-level Products link/menu. If it doesn't exist, this will wait for the fallback list selector.
    const menu = this.page.locator(this.productsMenuSelector).first();
    if (await menu.count()) {
      await menu.click();
      // wait for a products list to appear
      await this.page.waitForTimeout(500);
    } else {
      // If there's no explicit menu link, try waiting for a products list to be visible
      await this.page.locator(this.productsListSelector).first().waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
    }
  }

  async selectProduct(name: string) {
    const locator = this.productLink(name).first ? this.productLink(name).first() : this.page.locator(`a:has-text("${name}")`).first();
    await locator.waitFor({ state: 'visible', timeout: 5000 });
    await locator.click();
    // wait for navigation or product content to load
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Clicks the products menu, hovers the product list selector and clicks the requested product link.
   * Uses the locators defined on the page: `productsMenuSelector`, `productsListSelector`, and role-based link.
   */
  async clickMenuHoverAndClickListProduct(name = 'Employee Experience') {
    // Click the products menu
    const menu = this.page.locator(this.productsMenuSelector).first();
    await menu.waitFor({ state: 'visible', timeout: 5000 });
    await menu.click();

    // Hover over the list item (to reveal sub-menu or tooltip if needed)
    const listItem = this.page.locator(this.productsListSelector).first();
    await listItem.waitFor({ state: 'visible', timeout: 5000 });
    await listItem.hover();

    // Click the final product link (role-based preferred)
    const link = this.page.getByRole('link', { name });
    await link.waitFor({ state: 'visible', timeout: 5000 });
    await link.click();

    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Returns true when the `newStudy` element (by ID) is visible on the page.
   * Uses `waitForSelector` instead of count() to determine presence.
   */
  async isNewStudyVisible(timeout = 5000): Promise<boolean> {
    try {
      await this.page.waitForSelector(this.newStudy, { state: 'visible', timeout });
      return true;
    } catch (e) {
      return false;
    }
  }
}
