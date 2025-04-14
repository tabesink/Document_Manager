# Overview
------------------
This is a React context provider component named TabVisibilityProvider. It manages and provides tab visibility state to its children components via React Context.

# Purpose:
Provides a centralized way to manage and track which UI tabs are "visible" across the application. Although the actual visibility is controlled by CSS, this logic enables controlled toggling and querying in a predictable way using React Context.

Why it’s structured this way:
- Separation of concerns: State logic is decoupled from UI rendering
- Scalability: New tabs can be added or toggled easily.
- Performance: Uses memoization to minimize unnecessary re-renders.


# Imports
```tsx
import React, { useState, useEffect, useMemo } from 'react';
import { TabVisibilityContext } from './context';
import { TabVisibilityContextType } from './types';
import { useSettingsStore } from '@/stores/settings';
```
useState, useEffect, useMemo: React hooks for state management, side effects, and memoization.
TabVisibilityContext: The context object used to share tab visibility state.
TabVisibilityContextType: TypeScript type defining the structure of the context value.
useSettingsStore: A custom hook (probably from Zustand or a similar store) that gives access to the application’s settings state, especially the currentTab.

# Props Interface
```tsx
interface TabVisibilityProviderProps {
  children: React.ReactNode;
}
```
Defines the shape of the props. It only expects children, which are the nested components it will wrap.

# The Provider Component
```tsx
export const TabVisibilityProvider: React.FC<TabVisibilityProviderProps> = ({ children }) => {
```
Defines a React functional component that accepts children as a prop.

# Accessing the Current Tab
```tsx
const currentTab = useSettingsStore.use.currentTab();
```
Pulls the currentTab value from the settings store. This might trigger re-renders when the current tab changes.

# Local State: visibleTabs
```tsx
const [visibleTabs, setVisibleTabs] = useState<Record<string, boolean>>(() => ({
  'documents': true,
  'knowledge-graph': true,
  'retrieval': true,
  'api': true
}));
```
Initializes visibleTabs as a state object, where each tab ID maps to a true (visible) or false (hidden) value.
Uses a lazy initialization function for better performance on first render.

# useEffect to Ensure All Tabs Stay Visible
```tsx
useEffect(() => {
  setVisibleTabs((prev) => ({
    ...prev,
    'documents': true,
    'knowledge-graph': true,
    'retrieval': true,
    'api': true
  }));
}, [currentTab]);
```
Ensures that all tabs are always visible every time currentTab changes.
Even if the visibility was changed manually, it resets them to true.
Comment suggests CSS handles the actual visibility logic, so this state is more for tracking or compatibility.

# Memoized Context Value
```tsx
const contextValue = useMemo<TabVisibilityContextType>(() => ({
  visibleTabs,
  setTabVisibility: (tabId: string, isVisible: boolean) => {
    setVisibleTabs((prev) => ({
      ...prev,
      [tabId]: isVisible,
    }));
  },
  isTabVisible: (tabId: string) => !!visibleTabs[tabId],
}), [visibleTabs]);
```
Memoizes the context value to prevent re-renders of child components unless visibleTabs changes.

Provides:
visibleTabs: current visibility state.
setTabVisibility: function to change visibility of a specific tab.
isTabVisible: helper function to check if a tab is visible (defaulting to false if undefined).

# Providing the Context
```tsx
return (
  <TabVisibilityContext.Provider value={contextValue}>
    {children}
  </TabVisibilityContext.Provider>
);
```
Wraps its children with the context provider.
Shares the tab visibility state and functions throughout the app.

# Export Default
```tsx
export default TabVisibilityProvider;
```
Makes it available to import elsewhere in the app.