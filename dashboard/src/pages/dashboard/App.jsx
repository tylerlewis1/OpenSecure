import React from 'react';
import './dashboard.css';
import useDashboard from './useDashboard';
import Sensor from './sensors/sensor';
import useDashboardServices from './useDashboardServices';
function App() {
  const logic = useDashboard();
  const state = useDashboardServices();
  console.log(state);
    return (
        <div className="security-dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <h1>🏠 Open Secure</h1>
                <div className="user-info">
                    <span className="user-name">{logic.userData?.username || 'Unknown'}</span>
                    <span className="status-dot online"></span>
                </div>
            </header>

            {/* Arm/Disarm Control */}
            <div className="control-panel">
                <div className="status-section">
                    <div className={`status-light ${state.systemState?.Armed ? 'armed' : 'disarmed'}`}></div>
                    <div className="status-text">
                        <h2>{state.systemState?.Armed ? 'ARMED' : 'DISARMED'}</h2>
                        <p>All sensors active</p>
                    </div>
                </div>
                
                <div className="arm-buttons">
                    <button onClick={() => state.armHandler(true)} className={`arm-btn ${state.systemState?.Armed ? 'armed' : 'disarmed'}`}>🔒 ARM</button>
                    <button onClick={() => state.armHandler(false)} className={`arm-btn ${state.systemState?.Armed ? 'disarmed' : 'armed'}`}>🔓 DISARM</button>
                </div>

               
            </div>

            {/* Sensors Grid */}
            <div className="sensors-grid">
                {/* Door Sensors */}
                <div className="sensor-category">
                    <h3>🚪 Doors</h3>
                    <div className="sensor-list">
                        
                       {
                            state.systemState?.Sensors?.map((sensor) => {
                                console.log(sensor);
                                return <Sensor key={sensor.id} name={sensor.name} type={sensor.type} status={sensor.status} />;
                            })
                       }
                       
                           
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;