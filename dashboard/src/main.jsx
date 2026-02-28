import useAuth from './background/useAuth.js';
import Login from './pages/login/login.jsx';
import App from './pages/App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
const auth = await useAuth();
const token = await auth.checkForAuthToken();
createRoot(document.getElementById('root')).render(  
  <StrictMode>
    <BrowserRouter>
    {token ? (
      <>
        <App />
      </>
      ) : (
        <>
          <Login />
        </>
      )}
    
    </BrowserRouter>
  </StrictMode>,
)
