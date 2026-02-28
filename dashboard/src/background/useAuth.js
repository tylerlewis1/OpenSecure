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

// Create a singleton auth manager
class AuthManager {
  constructor() {
    this.token = null;
    this.listeners = new Set();
    this.storage = getStorageType();
    this.isExtension = typeof chrome !== 'undefined' && chrome.storage?.local;
    this.init();
    
    // Expose a global method to manually trigger updates (for localStorage)
    if (!this.isExtension) {
      window.__triggerAuthUpdate = (newToken) => {
        this.token = newToken;
        this.notify();
      };
    }
  }

  async init() {
    // Get initial token
    const data = await this.storage.get(['authToken']);
    this.token = data.authToken;
    console.log('AuthManager initialized with token:', this.token);
    
    // Set up listeners based on storage type
    if (this.isExtension) {
      // Chrome extension storage listener
      chrome.storage.onChanged.addListener(this.handleChromeStorageChange.bind(this));
    } else {
      // LocalStorage listener (only works for cross-tab changes)
      window.addEventListener('storage', this.handleLocalStorageChange.bind(this));
    }
  }

  handleChromeStorageChange(changes, areaName) {
    if (areaName === 'local' && changes.authToken) {
      const newToken = changes.authToken.newValue;
      console.log('Token changed in chrome.storage:', newToken);
      this.token = newToken;
      this.notify();
    }
  }

  handleLocalStorageChange(e) {
    if (e.key === 'authToken') {
      console.log('Token changed in localStorage (cross-tab):', e.newValue);
      this.token = e.newValue;
      this.notify();
    }
  }

  async setToken(token) {
    await this.storage.set({ authToken: token });
    this.token = token;
    this.notify();
    
    // For localStorage in the same tab, manually trigger update
    if (!this.isExtension && token !== undefined) {
      // Dispatch a custom event that we can listen to
      window.dispatchEvent(new CustomEvent('auth-token-changed', { detail: token }));
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Immediately call listener with current token if it exists
    if (this.token !== undefined) {
      listener(this.token);
    }
    return () => this.listeners.delete(listener);
  }

  notify() {
    console.log('Notifying listeners, token:', this.token);
    this.listeners.forEach(listener => listener(this.token));
  }

  getToken() {
    return this.token;
  }

  // Clean up method
  destroy() {
    if (this.isExtension) {
      chrome.storage.onChanged.removeListener(this.handleChromeStorageChange);
    } else {
      window.removeEventListener('storage', this.handleLocalStorageChange);
    }
    this.listeners.clear();
  }
}


const authManager = new AuthManager();

// Export a function that returns the same instance
export default function useAuth() {
  return authManager;
}