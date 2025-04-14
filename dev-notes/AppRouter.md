# AppRouter.tsx - Key Functionality

AppRouter.tsx serves as the main routing system for the application with the following key features:

## Routing Configuration
- Uses HashRouter from React Router DOM (indicated by the HashRouter as Router import), which is ideal for static file hosting as it uses URL hash for routing
- Sets up two main routes:
  - /login for the login page
  - Catch-all route /* that renders the main App component only when authenticated

## Authentication Management
- Contains an AppContent component that handles authentication state checks
- Uses useAuthStore from a custom state management system to track authentication status
- Implements a token validity check that runs on component mount to verify if the user has a valid token in localStorage

## Route Protection
- Implements route protection logic that redirects unauthenticated users to the login page
- Uses a useEffect hook to check authentication status and redirect accordingly
- Shows nothing while checking authentication status (when initializing is true)

## Navigation Service Integration
- Integrates with a custom navigationService to enable programmatic navigation throughout the app
- Provides the navigate function from useNavigate() to the navigation service

## Toast Notification System
- Incorporates a toast notification system using the Sonner library
- Configures toast notifications to appear at the bottom center with system theme and rich colors

## Theme Provider
- Wraps the entire application in a ThemeProvider component for consistent theming

