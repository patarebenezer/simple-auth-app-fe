# Simple Auth App Frontend

This project is a frontend for a simple authentication app that supports sign-up, sign-in, Google OAuth, Facebook OAuth, email verification, and user profile management. The frontend is built with React, TypeScript, and TailwindCSS.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine.
- pnpm (Preferred Node Package Manager) installed.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd simple-auth-app-fe

   ```

2. Install dependencies using pnpm:

````bash
pnpm install

3. Start the development server:
```bash pnpm start

Project Structure

	•	src/: Contains all source files for the project.
	•	components/: Contains reusable components.
	•	AuthSuccess.tsx: Component for handling successful authentication.
	•	Dashboard/: Directory for dashboard-related components.
	•	LoadingSpinner.tsx: Loading spinner component.
	•	Login/: Directory for login-related components.
	•	Logout.tsx: Logout component.
	•	ResetPassword.tsx: Component for resetting password.
	•	Signup.tsx: Component for user signup.
	•	UserProfile.tsx: Component for user profile.
	•	routes/: Contains route components.
	•	ProtectedRoute.tsx: Component for protected routes.
	•	PublicRoute.tsx: Component for public routes.
	•	App.tsx: Main app component.
	•	axiosConfig.ts: Axios configuration for API calls.
	•	index.tsx: Entry point of the application.
	•	react-app-env.d.ts: TypeScript environment definitions.
	•	setupTests.ts: Configuration for testing.
	•	.env: Environment variables.
	•	tailwind.config.js: TailwindCSS configuration.

Available Scripts

In the project directory, you can run:

	•	pnpm start: Runs the app in development mode.
	•	pnpm build: Builds the app for production.
	•	pnpm test: Launches the test runner.
	•	pnpm eject: Ejects the app from Create React App setup.
````
