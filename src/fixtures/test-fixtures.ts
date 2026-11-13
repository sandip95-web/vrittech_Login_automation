import { test as baseTest, expect } from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPage.js';

type CustomFixtures = {
  signupPage: SignUpPage;
};

export const test = baseTest.extend<CustomFixtures>({
  signupPage: async ({ page }, use) => {
    const signupPage = new SignUpPage(page);
    await use(signupPage);
  },
});

export { expect };

