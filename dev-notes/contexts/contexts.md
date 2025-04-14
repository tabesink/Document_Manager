# Overview
This file does the following:

Concept	Purpose
 - defaultContext	        Provides safe default values for the context
 - createContext()	        Initializes a new context with default behavior
 - TabVisibilityContext   	The context object that components can useContext() to access tab visibility state


# Import
```ts
import { createContext } from 'react';
```
You're importing the createContext function from React.
This function is used to create a React Context object, which enables components to share state without passing props manually at every level.

# Importing the Type
```ts
import { TabVisibilityContextType } from './types';
```
This brings in a TypeScript interface or type called TabVisibilityContextType, which defines the shape of the context.
It ensures that any value assigned to the context matches a specific structure (i.e., types for functions, objects, etc.).

# Default Context Value
```ts
const defaultContext: TabVisibilityContextType = {
  visibleTabs: {},
  setTabVisibility: () => {},
  isTabVisible: () => false,
};
```
This is the default value passed to the context when it’s created. It's important for several reasons:
Prevents undefined access if a component uses the context outside a provider.
Provides safe fallback behavior.

# Breakdown of defaultContext:
visibleTabs: {}: An empty object. No tabs are visible by default.
setTabVisibility: () => {}: An empty no-op function. If this default is ever used, calling this does nothing but won't throw an error.
isTabVisible: () => false: A function that always returns false, implying all tabs are hidden by default.

These are placeholders; the actual values will be provided by the TabVisibilityProvider you asked about earlier.

# Creating the Context
```ts
export const TabVisibilityContext = createContext<TabVisibilityContextType>(defaultContext);
```
This creates a context called TabVisibilityContext.
It's typed with TabVisibilityContextType, which ensures type safety.
defaultContext is passed in so that even if a component uses this context outside of its provider, it won't break — it will just get harmless defaults.

# Relationship to the Provider
The context created here is the container.
In your previous code (TabVisibilityProvider), this context is provided with real values:
```tsx
<TabVisibilityContext.Provider value={contextValue}>
  {children}
</TabVisibilityContext.Provider>
```
This makes TabVisibilityContext accessible via useContext(TabVisibilityContext) anywhere in the component tree, as long as it's within the provider.

# Why use a default context?
This is especially useful in larger apps because:
- It prevents runtime errors if a component tries to access the context outside of the provider (like TypeError: undefined is not a function).
- It helps during testing or rendering components in isolation without the full app context.
- It simplifies type-checking and autocomplete with IDEs.

