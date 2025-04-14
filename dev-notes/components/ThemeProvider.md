# ThemeProvider Component Documentation

## Overview
The ThemeProvider component manages theme state (light/dark/system) across the application using React Context and Zustand for state management.

- ThemeProvider lets your app know what theme to use.
- It applies theme styles to the <html> tag.
- Supports 'system' mode which follows the user's OS preference.
- Uses Zustand to manage and persist the theme state.
- Exposes everything through React Context so other components can read/update the theme.


## Implementation Details

```tsx
import { createContext, useEffect } from 'react'
import { Theme, useSettingsStore } from '@/stores/settings'
```
`createContext` creates a context for theme data.
`useEffect` is used to run side effects like updating the DOM.
`Theme` is likely a type like 'light' | 'dark' | 'system'.
`useSettingsStore` is a custom hook, probably from Zustand, which manages theme state globally.

### Types
```tsx
type ThemeProviderProps = {
  children: React.ReactNode
}
```
Props passed into the provider — usually just children.

```tsx
type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}
```
The data and methods that will be shared via context: the current theme and a way to change it.


### Initial State & Context

```tsx
const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null
}
```
This is the default state for the context before any actual data is loaded.

```tsx
const ThemeProviderContext = createContext<ThemeProviderState>(initialState)
```
This sets up the React Context that other components can use to read/update the theme.



### Main Component

```tsx
export default function ThemeProvider({ children, ...props }: ThemeProviderProps) {
```
This is your provider component that wraps your app or parts of it to give access to theme data.

```tsx
const theme = useSettingsStore.use.theme()
const setTheme = useSettingsStore.use.setTheme()
```
Grabs the current theme and the setter function from the useSettingsStore. This is Zustand-style slicing.



### Applying the Theme (useEffect)

```tsx
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
```
Selects the <html> element and removes any existing theme class.


```tsx
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
```
If the theme is 'system', it checks the OS setting using a media query.


```tsx
      const handleChange = (e: MediaQueryListEvent) => {
        root.classList.remove('light', 'dark')
        root.classList.add(e.matches ? 'dark' : 'light')
      }
```
This function updates the theme if the system's color scheme changes.

```tsx

      root.classList.add(mediaQuery.matches ? 'dark' : 'light')
      mediaQuery.addEventListener('change', handleChange)

      return () => mediaQuery.removeEventListener('change', handleChange)
```
Applies the correct theme and listens for OS-level theme changes. Cleans up when the component unmounts.

```tsx

    } else {
      root.classList.add(theme)
    }
  }, [theme])
```
If the theme is not system, it directly applies 'light' or 'dark'.

### Sharing the Context
```tsx

  const value = {
    theme,
    setTheme
  }
```
The actual value that will be shared with the rest of the app.

```tsx
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
```
Wraps its children with the context provider, giving them access to theme and setTheme.

### Exporting the Context
```tsx
export { ThemeProviderContext }
```
Allows other components to useContext(ThemeProviderContext) to read or update the theme.


### How it's used in practice
In your root component (App.tsx or similar):
```tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```
In a component that needs the theme:

```tsx
import { useContext } from 'react'
import { ThemeProviderContext } from './ThemeProvider'
const { theme, setTheme } = useContext(ThemeProviderContext)
