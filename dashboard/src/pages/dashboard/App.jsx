import React from 'react';
import useDashboard from './useDashboard';
function App() {
 const logic = useDashboard();
 console.log('User data in App.jsx:', logic.userData?.username); // Debug log to check userData 
 return (
  <>
    <h1>OpenSecure Dashboard</h1>
    <div>
      <h2>Hello {logic.userData?.username}</h2>

    </div>
  </>
  )
}

export default App
