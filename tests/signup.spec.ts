import { test } from '../src/fixtures/test-fixtures.js'
import { generateSignUpData } from '../src/test-data/signup-data.js'

test.describe('Sign-up success case', () => {
  test.beforeEach(async ({ signupPage }) => {
    await signupPage.goToWebsite()
  })

  test.only('Verify Signup Functionality', async ({ signupPage}) => {
    const signUpData = generateSignUpData()
    await signupPage.registerUser(signUpData)
  }
)
})
