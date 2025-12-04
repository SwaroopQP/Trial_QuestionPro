import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly ListSurvey = '#fl-study-list-home-page';
  readonly option = '#flADHOCFramework';
  readonly TypeOfSurvey = "//ul//li//label[text()='On-boarding Experience ']";
  readonly Usetemplate = "//li[@id='90']//span[contains(text(),'Use Template')]";
  readonly createTemplate = '#create';
  readonly Save = "//button[text()='Create']";

  constructor(page: Page) {
    this.page = page;
  }
    
  //create function to create survey where I want click on first two options and hover over TypeOfSurvey    
    async createSurvey() {
        await this.page.locator(this.ListSurvey).click();
        await this.page.locator(this.option).click();
        await this.page.locator(this.TypeOfSurvey).hover();
        await this.page.locator(this.Usetemplate).click();
        await this.page.locator(this.createTemplate).click();
        await this.page.locator(this.Save).click();
        
    }
}