High-Level Purpose
-------------------
- Checks if login is needed (based on app config).
- If not needed, logs in automatically (guest mode) and redirects.
- If needed, shows a login form.
- Submits login info, saves auth token, and redirects to home.

This is a polished, production-ready login component with:
-------------------
- Smart detection for guest mode or auth mode.
- Clean state management with Zustand.
- Flexible styling with Tailwind.
- Language support.
- Good UX via loading indicators and toasts.



# Imports Overview

| Module | Purpose |
|--------|---------|
| useState, useEffect, useRef  | Manage state & side effects |
| useNavigate                  | React Router navigation |
| useAuthStore                 | Zustand store for auth |
| loginToServer, getAuthStatus | API functions |
| toast                        | Shows notifications |
| useTranslation               | Multilingual support |
| Card, Input, Button          | UI Components |
| ZapIcon                      | Fancy icon |
| AppSettings                  | Settings panel in top-right corner |


# State & Hooks
Hooks are functions that let you “hook into” React’s state and lifecycle features in function components. They’re the reason you don’t need class components anymore.
```tsx
const [loading, setLoading] = useState(false)
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [checkingAuth, setCheckingAuth] = useState(true)
const authCheckRef = useRef(false)
```
loading: disables button while logging in.
checkingAuth: prevents showing form if auth isn't needed.
authCheckRef: avoids duplicate useEffect calls in dev mode (a Vite-specific issue).

# Auth Check on Page Load
```tsx
useEffect(() => {
  const checkAuthConfig = async () => {
    if (authCheckRef.current) return;
    authCheckRef.current = true;

    if (isAuthenticated) {
      navigate('/')
      return
    }

    const status = await getAuthStatus()

    if (status.core_version || status.api_version) {
      sessionStorage.setItem('VERSION_CHECKED_FROM_LOGIN', 'true');
    }

    if (!status.auth_configured && status.access_token) {
      // Guest mode - log in automatically
      login(status.access_token, true, ...)
      toast.info(status.message)
      navigate('/')
    } else {
      setCheckingAuth(false) // show login form
    }
  }

  checkAuthConfig()
}, [isAuthenticated, login, navigate])
```
- Checks whether login is required.
- If not, logs in using a guest token and redirects to home.
- If yes, shows the login form.


# Handle Login Submit
```tsx
const handleSubmit = async (e) => {
  e.preventDefault()

  if (!username || !password) {
    toast.error(t('login.errorEmptyFields'))
    return
  }

  try {
    setLoading(true)
    const response = await loginToServer(username, password)
    const isGuestMode = response.auth_mode === 'disabled'

    login(response.access_token, isGuestMode, ...)
    sessionStorage.setItem('VERSION_CHECKED_FROM_LOGIN', 'true')

    toast.success(t('login.successMessage'))
    navigate('/')
  } catch (error) {
    toast.error(t('login.errorInvalidCredentials'))
    useAuthStore.getState().logout()
    localStorage.removeItem('LIGHTRAG-API-TOKEN')
  } finally {
    setLoading(false)
  }
}
```
Key Features:
- Form is validated.
- Calls login API.
- Saves token using Zustand store.
- Shows success or error messages.
- Handles guest mode vs full auth.
- Redirects to / after login.

# UI Rendering
- Centered login form using Tailwind.
- Uses custom Card, Input, and Button components.
- Displays LightRAG branding.
- Includes AppSettings panel top-right.

# Translations
Anywhere you see t('...') — it's pulling translated text, like:
```tsx
t('login.loginButton')  // could be "Log in", "Connexion", etc.
```
This comes from react-i18next.