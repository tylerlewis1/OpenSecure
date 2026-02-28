import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App.jsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import useAuth from './background/useAuth.js';
  const auth = await useAuth();
  const token = await auth.checkForAuthToken();
createRoot(document.getElementById('root')).render(  
  <StrictMode>
    <BrowserRouter>
    {/* <Login /> */}
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
