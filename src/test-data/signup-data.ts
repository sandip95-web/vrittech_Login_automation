export interface SignUpData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  agencyName: string
  roleInAgency: string
  emailAddress: string
  website: string
  address: string
  region: string
  yearsOfExperience: string
  noOfStudentRecruited?: string
  focusArea?: string
  successMetrics?: string
  bussinessRegisteredNumber?: string
  preferedCountry: string[]
  preferedCertificationDetails?: string
}

export const generateSignUpData = (): SignUpData => {
  const uniqueId = crypto.randomUUID()

  return {
    firstName: 'John',
    lastName: 'Doe',
    email: `john${uniqueId}@xzvg8avh.mailosaur.net`,
    phoneNumber: `98${Math.floor(10000000 + Math.random() * 90000000)}`,
    password: 'Test@123',
    confirmPassword: 'Test@123',
    agencyName: 'Test Agency',
    roleInAgency: 'Manager',
    emailAddress: `agency${uniqueId}@xzvg8avh.mailosaur.net`,
    website: 'www.testagency.com',
    address: 'Lalitpur, Nepal',
    region: 'Nepal',
    yearsOfExperience: '5 years',
    noOfStudentRecruited: '100',
    focusArea: 'Education',
    successMetrics: '90',
    bussinessRegisteredNumber: '123456789',
    preferedCountry: ['Nepal', 'India'],
    preferedCertificationDetails: 'ISO 9001',
  }
}
