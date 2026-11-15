import { expect, type Locator, type Page } from '@playwright/test'
import { getOTP } from '../helpers/mailosaur.js'
import type { SignUpData } from '../test-data/signup-data.js'

export class SignUpPage {
  readonly page: Page
  readonly getStartedButton: Locator
  readonly termsCheckbox: Locator
  readonly continueButton: Locator
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly emailInput: Locator
  readonly phoneNumberInput: Locator
  readonly passwordInput: Locator
  readonly confirmPasswordInput: Locator
  readonly nextButton: Locator
  readonly otpInput: Locator
  readonly verifyOTPButton: Locator
  readonly agencyNameInput: Locator
  readonly roleInAgencyInput: Locator
  readonly emailAddressInput: Locator
  readonly websiteInput: Locator
  readonly addressInput: Locator
  readonly regionOfOperationInput: Locator
  readonly yearsOfExperienceInput: Locator
  readonly numberOfStudentRecruitedInput: Locator
  readonly focusAreaInput: Locator
  readonly successMetricsInput: Locator
  readonly bussinessRegisteredNumberInput: Locator
  readonly preferedCountryInput: Locator
  readonly preferedCertificationDetails: Locator
  readonly businessDocumentUploadInput: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    this.page = page
    this.getStartedButton = page
      .getByRole('button', { name: 'Get Started' })
      .nth(0)
    this.termsCheckbox = page.locator('#remember')
    this.continueButton = page.getByRole('button', { name: 'Continue' })
    this.firstNameInput = page.locator('input[name="firstName"]')
    this.lastNameInput = page.locator('input[name="lastName"]')
    this.emailInput = page.locator('input[name="email"]')
    this.phoneNumberInput = page.locator('input[name="phoneNumber"]')
    this.passwordInput = page.locator('input[name="password"]')
    this.confirmPasswordInput = page.locator('input[name="confirmPassword"]')
    this.nextButton = page.getByRole('button', { name: 'Next', exact: true })
    this.otpInput = page.locator('input[autocomplete="one-time-code"]')
    this.verifyOTPButton = page.getByRole('button', {
      name: 'Verify Code',
      exact: true,
    })

    this.agencyNameInput = page.getByPlaceholder('Enter Agency Name')
    this.roleInAgencyInput = page.getByPlaceholder('Role In Agency')
    this.emailAddressInput = page.locator('input[name="agency_email"]')
    this.websiteInput = page.locator('input[name="agency_website"]')
    this.addressInput = page.locator('input[name="agency_address"]')
    this.regionOfOperationInput = page
      .locator('button[role="combobox"]')
      .filter({
        has: page.getByText('Select Your Region of Operation'),
      })
    this.yearsOfExperienceInput = page.getByRole('combobox', {
      name: 'Years of Experience',
    })
    this.numberOfStudentRecruitedInput = page.locator(
      'input[name="number_of_students_recruited_annually"]',
    )
    this.focusAreaInput = page.locator('input[name="focus_area"]')
    this.successMetricsInput = page.locator('input[name="success_metrics"]')
    this.bussinessRegisteredNumberInput = page.locator(
      'input[name="business_registration_number"]',
    )
    this.preferedCountryInput = page.getByLabel('Preferred Countries')
    this.preferedCertificationDetails = page.locator(
      'input[name="certification_details"]',
    )
    this.businessDocumentUploadInput = page.locator('input[type="file"]').nth(0)

    this.submitButton = page.getByRole('button', { name: 'Submit' })
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
    if (isContinueButtonEnabled) {
      await this.continueButton.click()
    }
    await this.page.waitForTimeout(2000)
    expect(this.page.url()).toContain('/register?step=setup')
    expect(this.page.getByText('1. Set up your Account').first()).toBeVisible()
  }

  async firstStageSignUpForm(data: SignUpData): Promise<void> {
    expect(this.page.getByText('1. Set up your Account').first()).toBeVisible()
    if (data.firstName !== undefined) {
      await this.firstNameInput.fill(data.firstName)
    }
    if (data.lastName !== undefined) {
      await this.lastNameInput.fill(data.lastName)
    }
    if (data.email !== undefined) {
      await this.emailInput.fill(data.email)
    }
    if (data.phoneNumber !== undefined) {
      await this.phoneNumberInput.fill(data.phoneNumber)
    }
    if (data.password !== undefined) {
      await this.passwordInput.fill(data.password)
    }
    if (data.confirmPassword !== undefined) {
      await this.confirmPasswordInput.fill(data.confirmPassword)
    }
  }

  async clickNextButton() {
    const isNextButtonEnabled = await this.nextButton.isEnabled()
    if (isNextButtonEnabled) {
      await this.nextButton.click()
    }
  }

  async enterOTP(otp: string) {
    await this.otpInput.fill(otp)

    await this.verifyOTPButton.click()
    await this.page.waitForTimeout(2000)
    expect(
      this.page.getByText('Your account has been created successfully', {
        exact: true,
      }),
    ).toBeVisible()
  }

  async AgencyStageSignUpForm(data: SignUpData): Promise<void> {
    expect(this.page.getByText('2. Agency Details').first()).toBeVisible()
    if (data.agencyName !== undefined) {
      await this.agencyNameInput.fill(data.agencyName)
    }
    if (data.roleInAgency !== undefined) {
      await this.roleInAgencyInput.fill(data.roleInAgency)
    }
    if (data.emailAddress !== undefined) {
      await this.emailAddressInput.fill(data.emailAddress)
    }
    if (data.website !== undefined) {
      await this.websiteInput.fill(data.website)
    }
    if (data.address !== undefined) {
      await this.addressInput.fill(data.address)
    }
    if (data.region !== undefined) {
      await this.selectRegion(data.region)
    }
  }
  async selectRegion(region: string) {
    await this.regionOfOperationInput.click()

    await this.page.getByText(region, { exact: true }).last().click()
  }

  async clickAgencyNextButton() {
    await this.clickNextButton()

    await this.page.waitForTimeout(2000)
    expect(
      this.page.getByText('Agency Details Added Successfully', {
        exact: true,
      }),
    ).toBeVisible()
  }

  async selectExperienceLevel(years: string) {
    await this.yearsOfExperienceInput.click()

    await this.page
      .getByRole('option', {
        name: years,
        exact: true,
      })
      .click()
  }

  async selectServicesProvided() {
    const carrerCounselingCheckBox = this.page.getByLabel('Career Counseling')
    await carrerCounselingCheckBox.check()
    await expect(carrerCounselingCheckBox).toBeChecked()
  }

  async ExperienceSignUpForm(data: SignUpData): Promise<void> {
    expect(
      this.page.getByText('3. Professional Experience').first(),
    ).toBeVisible()
    if (data.yearsOfExperience !== undefined) {
      await this.selectExperienceLevel(data.yearsOfExperience)
    }
    if (data.noOfStudentRecruited !== undefined) {
      await this.numberOfStudentRecruitedInput.fill(data.noOfStudentRecruited)
    }
    if (data.focusArea !== undefined) {
      await this.focusAreaInput.fill(data.focusArea)
    }
    if (data.successMetrics !== undefined) {
      await this.successMetricsInput.fill(data.successMetrics)
    }

    await this.selectServicesProvided()
  }

  async clickExperienceNextButton() {
    await this.clickNextButton()
    await this.page.waitForTimeout(2000)
    expect(
      this.page.getByText('Professional Experience Added successfully.', {
        exact: true,
      }),
    ).toBeVisible()
  }

  async selectPreferredCountries(countries: string[]) {
    await this.preferedCountryInput.click()

    for (const country of countries) {
      await this.page.getByText(country, { exact: true }).last().click()
    }
  }

  async selectPreferedInstitution() {
    const CheckBox = this.page.getByLabel('Colleges')
    await CheckBox.check()
    await expect(CheckBox).toBeChecked()
  }

  async uploadImage() {
    await this.businessDocumentUploadInput.setInputFiles(
      'test-files/university.png',
    )

    await expect(this.businessDocumentUploadInput).toHaveJSProperty(
      'files.length',
      1,
    )
  }

  async VerificaitonAndPreferenceForm(data: SignUpData): Promise<void> {
    expect(
      this.page.getByText('4. Verification and Preferences').first(),
    ).toBeVisible()

    if (data.bussinessRegisteredNumber !== undefined) {
      await this.bussinessRegisteredNumberInput.fill(
        data.bussinessRegisteredNumber,
      )
    }
    if (data.preferedCountry !== undefined) {
      await this.selectPreferredCountries(data.preferedCountry)
    }

    if (data.preferedCertificationDetails !== undefined) {
      await this.preferedCertificationDetails.fill(
        data.preferedCertificationDetails,
      )
    }

    await this.selectPreferedInstitution()

    await this.uploadImage()
  }

  async clickSubmitButton() {
    const isSubmitButtonEnabled = await this.submitButton.isEnabled()
    if (isSubmitButtonEnabled) {
      await this.submitButton.click()
    }
    await this.page.waitForTimeout(5000)
    await this.page.waitForURL('**/admin/profile**')

    await expect(
      this.page.getByRole('heading', {
        name: 'My Profile',
        exact: true,
      }),
    ).toBeVisible()
  }

  async registerUser(data: SignUpData): Promise<void> {
    await this.clickGetStartedButton()
    await this.acceptTermsAndConditions()
    await this.clickContinueButton()
    await this.firstStageSignUpForm(data)
    await this.clickNextButton()
    const otp = await getOTP(data.email, new Date())
    await this.enterOTP(otp)
    await this.AgencyStageSignUpForm(data)
    await this.clickAgencyNextButton()
    await this.ExperienceSignUpForm(data)
    await this.clickExperienceNextButton()
    await this.VerificaitonAndPreferenceForm(data)
    await this.clickSubmitButton()
  }
}
