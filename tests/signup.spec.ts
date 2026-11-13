import { test } from '../src/fixtures/test-fixtures.js'

test.describe('Sign-up success case', () => {
  test.beforeEach(async ({ signupPage }) => {
    await signupPage.goToWebsite()
  })

  test.only('Verify Signup Functionality', async ({ signupPage}) => {
    await signupPage.clickGetStartedButton()
    await signupPage.acceptTermsAndConditions()
    await signupPage.clickContinueButton()
  }
)
})
