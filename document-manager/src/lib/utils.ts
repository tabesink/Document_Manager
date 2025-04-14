// Importing necessary utilities for class name merging and random color generation
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
// Importing Zustand types for creating selectors
import { StoreApi, UseBoundStore } from 'zustand'

// Function to merge class names using clsx and twMerge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to generate a random color code
export function randomColor() {
  const digits = '0123456789abcdef'
  let code = '#'
  for (let i = 0; i < 6; i++) {
    code += digits.charAt(Math.floor(Math.random() * 16))
  }
  return code
}

// Function to format error messages
export function errorMessage(error: any) {
  return error instanceof Error ? error.message : `${error}`
}

// Type definition for creating selectors
type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

// Function to create selectors for a given store
export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  // Dynamically creating selectors for each key in the store's state
  for (const k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}
