# QA INTERN ASSESSMENT – VRIT TECHNOLOGIES

## 1. Assessment Documentation

I have prepared the following documents as part of the QA Intern Assessment:

1. **Test Plan**
2. **Test Scenarios**
3. **Test Cases**
4. **Requirement Traceability Matrix (RTM)**
5. **Bug Report** – I identified one bug during testing and documented it in the Bug Report file. Kindly review it.

All the above documents are available in the `docs` folder.

## 2. OTP Verification Note

**IMPORTANT:** During the signup process, when the application reaches the OTP verification step, please allow approximately **10 seconds** for the OTP to be automatically retrieved and entered.

No manual OTP entry is required during the automated execution.

## 3. Automation Execution

The automation tests are developed using **Playwright with TypeScript**.

### Prerequisites

- Node.js (version 20 or later)
- pnpm (version 12.18.0)

**IMPORTANT: This project uses pnpm as its package manager. Please use pnpm instead of npm when installing dependencies and executing scripts.**

### Install pnpm

If pnpm is not already installed, run:

```bash
npm install -g pnpm@12.18.0
```

Verify the installation:

```bash
pnpm --version
```

### Installation

Open the project in your terminal and run:

```bash
pnpm install
```

This will install all the required dependencies using the `pnpm-lock.yaml` file.

### Install Playwright Browsers

If Playwright browsers are not already installed, run:

```bash
pnpm exec playwright install
```

### Run Tests in Headed Mode

To execute the tests in a visible browser and observe the complete signup process, run:

```bash
pnpm run headed
```

### Additional Scripts

Other available test scripts are defined in the `package.json` file. Please refer to it for additional execution options.

## 4. Tools & Technologies Used

The following tools and dependencies were used for this assessment:

- **Playwright Test**
- **TypeScript**
- **Mailosaur**
- **Dotenv**
- **Node.js**
- **pnpm**

## 5. Configuration Note

The project uses environment variables configured through a `.env` file.

**Note:** A `.env.example` file can be provided as a reference for the required environment variables. Please configure your own `.env` file with the necessary credentials before executing the tests. Do not share private API keys or credentials publicly.

## 6. Closing Note

I truly hope to be selected for this internship at VRIT Technologies. I am excited about the opportunity to learn, gain practical experience, work on real-world projects, and grow as a QA professional.

I am ready to give my best and make the most of this opportunity.

**Thank you for taking the time to review my assessment!**
