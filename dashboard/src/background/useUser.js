import { useState, useEffect } from 'react';

const getStorageType = () => {
  const isExtension = typeof chrome !== 'undefined' && chrome.storage?.local;
  
  return isExtension 
    ? chrome.storage.local 
    : {
        get: async (keys) => {
          const key = Array.isArray(keys) ? keys[0] : keys;
          return { [key]: localStorage.getItem(key) };
        },
        set: async (items) => {
          Object.entries(items).forEach(([key, value]) => {
            if (value === null) {
              localStorage.removeItem(key);
            } else {
              localStorage.setItem(key, value);
            }
          });
        }
      };
};

class User {
  constructor() {
    this.user = null;
    this.storage = getStorageType();
    this.listeners = new Set(); // Add this
  }

  async setUser(newUser) {
    await this.storage.set({ user: JSON.stringify(newUser) });
    this.user = newUser;
    this.notify(); // Add this
  }

  async getUser() {
    const data = await this.storage.get(['user']);
    this.user = data.user;
    return JSON.parse(this.user);
  }

  // Add these methods
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener(this.user));
  }
}

// Keep one instance of user across the app
const userInstance = new User();

// Fix the hook to be reactive
export default function useUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial user
    userInstance.getUser().then((userData) => {
      setUser(userData);
      setIsLoading(false);
    });

    // Subscribe to changes
    const unsubscribe = userInstance.subscribe((newUser) => {
      setUser(newUser);
    });

    return unsubscribe;
  }, []);

  // Return the same interface but with React state
  return {
    user,
    isLoading,
    setUser: (newUser) => userInstance.setUser(newUser),
    getUser: () => userInstance.getUser()
  };
}