# High-Level Purpose
-------------------
A Zustand store setup for managing authentication and backend health state in a React app. 
It’s a well-organized state management system, broken into two separate stores
Zustand is a simple and fast state management library for React. Think of it as a lightweight alternative to Redux — fewer boilerplates, great for centralized logic.

#  Summary
This is a powerful yet clean setup:
Feature	                        | Handled By
Login / Logout	                | useAuthStore
Guest mode detection	        | JWT role
Server branding / versioning	| stored via setCustomTitle & setVersion
Backend API health check	    | useBackendState.check()
Zustand + localStorage	        | Persistent & reactive state
Token parsing	                | Extracted from JWTs

# File Overview
-------------------
## Store #1: useAuthStore
Manages all authentication-related state, including:
Login/logout
Token & role (guest or not)
Core/API version
Web UI custom title

## Store #2: useBackendState
Handles backend status:
Health check
Pipeline status
Error messages


# Auth Store (useAuthStore)
-------------------
## State Shape
```ts
interface AuthState {
  isAuthenticated: boolean
  isGuestMode: boolean
  coreVersion: string | null
  apiVersion: string | null
  username: string | null
  webuiTitle: string | null
  webuiDescription: string | null
}
```
## Key Methods
```login(token, isGuest, ...)```
Saves the token to localStorage
Parses username from the JWT (sub field)
Updates Zustand state
 
```logout()```
Clears token from localStorage
Keeps version/title data for continuity
Resets authentication flags

```setVersion(coreVersion, apiVersion)```
Updates version in both state and localStorage
setCustomTitle(webuiTitle, webuiDescription)
Lets server define UI branding (saved in localStorage)

# Token Utilities
-------------------
parseTokenPayload(token)
Parses the payload part of a JWT

```js
// JWT: header.payload.signature
JSON.parse(atob(token.split('.')[1]))
```
```getUsernameFromToken(token)```
Pulls the sub claim from the payload

```isGuestToken(token)```
Detects if the role claim is "guest"

```initAuthState()```
Reads token & info from localStorage
Builds initial Zustand state


# Backend Store (useBackendState)
-------------------
## State Shape
```ts
interface BackendState {
  health: boolean
  message: string | null
  messageTitle: string | null
  status: LightragStatus | null
  lastCheckTime: number
  pipelineBusy: boolean
}
```
## Key Methods
```check()```
```Calls checkHealth()```
API

If healthy:
- Saves versions & UI title via useAuthStore
- Sets health to true
If not:
- Sets error state

```clear()```
Resets message and health to defaults

```setErrorMessage(message, title)```
Manual way to inject backend errors into UI

```setPipelineBusy(busy)```
Updates whether the AI pipeline is currently processing

### Why Separate Stores?
Auth and backend health are logically separate.
Smaller, focused stores = better maintainability and performance.
Can be used independently across components.


## createSelectors Utility
This:
```ts
const useBackendState = createSelectors(useBackendStateStoreBase)
```
Likely adds selector helpers (like ```useBackendState.use.health()```) for performance-tuned subscriptions. It avoids re-rendering unless specific keys change.