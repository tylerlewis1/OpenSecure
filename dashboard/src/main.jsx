import useAuth from './background/useAuth.js';
import Login from './pages/login/login.jsx';
import App from './pages/App.jsx';
import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

function Root() {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get the auth instance (no await needed now since it's synchronous)
    const auth = useAuth();
    
    // Get initial token
    const initialToken = auth.getToken();
    setToken(initialToken);
    setIsLoading(false);
    
    // Subscribe to token changes
    const unsubscribe = auth.subscribe((newToken) => {
      console.log('Token updated in React:', newToken);
      setToken(newToken);
    });
    
    // Cleanup subscription
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array means this runs once

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      {token ? <App /> : <Login />}
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);