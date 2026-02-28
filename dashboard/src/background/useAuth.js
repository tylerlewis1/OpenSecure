const getStorageType = () => {
  const isExtension = typeof chrome !== 'undefined' && chrome.storage?.local;
  
  return isExtension 
    ? chrome.storage.local 
    : {
        get: async (keys) => {
          const key = Array.isArray(keys) ? keys[0] : keys;
          return { [key]: localStorage.getItem(key) };
        }
      };
};

export default async function useAuth() {
  const storage = getStorageType();
  const data = await storage.get(['authToken']);
  const token = data.authToken;

  return {
    checkForAuthToken: async () => {
      if (!token) return null;
      return token;
    }
  };
}
