/**
 * useLocalStorage is a custom React hook for managing local storage with state synchronization.
 * It provides an easy way to interact with local storage while keeping React state updated.
 *
 * @template T - The type of the data stored in local storage.
 * @param {string} key - The key to identify the local storage item.
 * @param {T | undefined | (() => T)} initialValue - The initial value of the state.
 *   Can be a value, undefined, or a function that returns the initial value.
 * @returns {[T, (newValue: T) => void]} - A tuple containing the current value and a function to update it.
 */

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T | undefined | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === 'function') {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  } )
  
  useEffect( () => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value] )

  return [value, setValue] as [typeof value, typeof setValue];
}

