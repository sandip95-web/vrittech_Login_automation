import { expect, type Locator, type Page } from '@playwright/test'

export class SignUpPage {
  readonly page: Page
  readonly getStartedButton: Locator
  readonly termsCheckbox: Locator
  readonly continueButton: Locator

  constructor(page: Page) {
    this.page = page
    this.getStartedButton = page.getByRole('button', { name: 'Get Started' }).nth(0)
    this.termsCheckbox = page.locator('#remember')
    this.continueButton = page.getByRole('button', { name: 'Continue' })
  }

  async goToWebsite() {
    await this.page.goto(process.env.BASE_URL || 'http://localhost:8008')
  }

  async clickGetStartedButton() {
    await this.getStartedButton.click()
    await this.page.waitForTimeout(2000)
    expect(this.page.url()).toContain('/register')
    expect(
      this.page.getByRole('heading', { name: 'Register Your Agency' }),
    ).toBeVisible()
  }

  async acceptTermsAndConditions() {
    const isChecked = await this.termsCheckbox.isChecked()
    if (!isChecked) {
      await this.termsCheckbox.check()
    }
   expect(await this.termsCheckbox.isChecked()).toBe(true)

  }

  async clickContinueButton() {

    const isContinueButtonEnabled = await this.continueButton.isEnabled()
    if(isContinueButtonEnabled) {
      await this.continueButton.click()
    }
    await this.page.waitForTimeout(2000)
    expect(this.page.url()).toContain('/register?step=setup')
    expect(
      this.page.getByText('1. Set up your Account').first(),
    ).toBeVisible()
  }


  async fillSignUpForm() {}
}
