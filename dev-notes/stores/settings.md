# Overview
-------------
This file is a Zustand store with a lot of application settings (for theme, language, graph viewer UI, auth, etc.), and it also uses persistence via localStorage so your settings don’t reset on page refresh.

# Zustand Store Explanation
The Zustand store is a state management system that allows you to manage global state in your application. It is designed to be simple, fast, and scalable. Zustand is built on top of the React Context API and provides a more efficient and easier-to-use alternative to traditional state management solutions like Redux.
Overall, the Zustand store provides a powerful and flexible way to manage state in your application, making it an ideal choice for complex applications like this one.


# Zustand + Persistence
```ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
```
This lets you persist Zustand state across page reloads using localStorage.


# Settings State Shape
The SettingsState interface defines what this store manages:
Some Key Categories:
- Document & Graph Viewer UI Settings
- ```showFileName, showPropertyPanel, showLegend, etc.```

Graph Visualization Options
- Edge size, max nodes, graph depth, iterations, etc.

Retrieval Settings
- ```queryLabel, retrievalHistory, querySettings (used for search-type queries)```

Auth
- apiKey

App Settings
- theme (light, dark, system)
- language (en, zh, fr, ar)
- currentTab (documents, api, etc.)

It also defines functions to update each part of the state, e.g., setLanguage, setTheme,

# Using persist() to save in localStorage
This part wraps your store:
```ts
persist((set) => ({
  ...
}), {
  name: 'settings-storage',
  storage: createJSONStorage(() => localStorage),
  version: 11,
  migrate: (state, version) => { ... }
})
```
What it does:
name: Key used in localStorage (settings-storage)
version: Helps control how persisted data upgrades across app versions
migrate: A function that upgrades old stored state formats to match the latest version (super useful when your app evolves)

# State Updaters
All state variables have matching setter functions:
```ts
setTheme: (theme: Theme) => set({ theme }),
setGraphMaxNodes: (nodes: number) => set({ graphMaxNodes: nodes }),
updateQuerySettings: (settings) =>
  set((state) => ({
    querySettings: { ...state.querySettings, ...settings }
  }))
```
These are functions you’ll call in components to update settings like theme or graph layout.

# Special logic – i18n integration
```ts
setLanguage: (language: Language) => {
  set({ language })
  import('i18next').then(({ default: i18n }) => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language)
    }
  })
}
```
When you change the language setting, it updates both the Zustand state and the actual i18next language. This ensures the UI is actually translated when the user switches languages.

# Using the Store
You use this store in components like:
```tsx
const theme = useSettingsStore((state) => state.theme)
const setTheme = useSettingsStore((state) => state.setTheme)
```

Thanks to ```createSelectors() (likely a custom helper),``` you might also get enhanced selector capabilities like:
```tsx
const { theme, setTheme } = useSettingsStore()
```

# Migrations
Every time you bump the version number, you can upgrade old data like this:
```ts
if (version < 9) {
  state.showFileName = false
}
if (version < 10) {
  delete state.graphMinDegree
  state.graphMaxNodes = 1000
}
```
This makes sure users who had older local storage formats still get the correct default values or structure when the app updates.

# Summary
This store is a central config/settings manager for your app — like a control panel:
- UI settings
- Graph behavior
- Auth API key
- User preferences
- Language and theme
- All persisted between sessions