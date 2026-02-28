import React from 'react';
import './dashboard.css';
import useDashboard from './useDashboard';
function App() {
  const logic = useDashboard();
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
                    <div className="status-light armed"></div>
                    <div className="status-text">
                        <h2>ARMED</h2>
                        <p>All sensors active</p>
                    </div>
                </div>
                
                <div className="arm-buttons">
                    <button className="arm-btn armed">🔒 ARM</button>
                    <button className="arm-btn disarmed">🔓 DISARM</button>
                </div>

               
            </div>

            {/* Sensors Grid */}
            <div className="sensors-grid">
                {/* Door Sensors */}
                <div className="sensor-category">
                    <h3>🚪 Doors</h3>
                    <div className="sensor-list">
                        <div className="sensor-item closed">
                            <div className="sensor-info">
                                <span className="sensor-name">Front Door</span>
                                <span className="sensor-status">Closed</span>
                            </div>
                            <span className="sensor-icon">✅</span>
                        </div>
                        <div className="sensor-item closed">
                            <div className="sensor-info">
                                <span className="sensor-name">Back Door</span>
                                <span className="sensor-status">Closed</span>
                            </div>
                            <span className="sensor-icon">✅</span>
                        </div>
                        <div className="sensor-item open">
                            <div className="sensor-info">
                                <span className="sensor-name">Garage Door</span>
                                <span className="sensor-status">Open</span>
                            </div>
                            <span className="sensor-icon">⚠️</span>
                        </div>
                    </div>
                </div>

                {/* Window Sensors */}
                <div className="sensor-category">
                    <h3>🪟 Windows</h3>
                    <div className="sensor-list">
                        <div className="sensor-item closed">
                            <div className="sensor-info">
                                <span className="sensor-name">Living Room</span>
                                <span className="sensor-status">Closed</span>
                            </div>
                            <span className="sensor-icon">✅</span>
                        </div>
                        <div className="sensor-item closed">
                            <div className="sensor-info">
                                <span className="sensor-name">Kitchen</span>
                                <span className="sensor-status">Closed</span>
                            </div>
                            <span className="sensor-icon">✅</span>
                        </div>
                        <div className="sensor-item closed">
                            <div className="sensor-info">
                                <span className="sensor-name">Bedroom</span>
                                <span className="sensor-status">Closed</span>
                            </div>
                            <span className="sensor-icon">✅</span>
                        </div>
                        <div className="sensor-item open">
                            <div className="sensor-info">
                                <span className="sensor-name">Bathroom</span>
                                <span className="sensor-status">Open</span>
                            </div>
                            <span className="sensor-icon">⚠️</span>
                        </div>
                    </div>
                </div>

                {/* Motion Sensors */}
                <div className="sensor-category">
                    <h3>👁️ Motion</h3>
                    <div className="sensor-list">
                        <div className="sensor-item clear">
                            <div className="sensor-info">
                                <span className="sensor-name">Living Room</span>
                                <span className="sensor-status">Clear</span>
                            </div>
                            <span className="sensor-icon">✅</span>
                        </div>
                        <div className="sensor-item clear">
                            <div className="sensor-info">
                                <span className="sensor-name">Hallway</span>
                                <span className="sensor-status">Clear</span>
                            </div>
                            <span className="sensor-icon">✅</span>
                        </div>
                        <div className="sensor-item detected">
                            <div className="sensor-info">
                                <span className="sensor-name">Basement</span>
                                <span className="sensor-status">Motion!</span>
                            </div>
                            <span className="sensor-icon">🔴</span>
                        </div>
                    </div>
                </div>

                {/* Environmental Sensors */}
                <div className="sensor-category">
                    <h3>🌡️ Environment</h3>
                    <div className="sensor-list">
                        <div className="sensor-item">
                            <div className="sensor-info">
                                <span className="sensor-name">Smoke Detector</span>
                                <span className="sensor-value">Clear</span>
                            </div>
                            <span className="sensor-icon">✅</span>
                        </div>
                        <div className="sensor-item">
                            <div className="sensor-info">
                                <span className="sensor-name">CO Detector</span>
                                <span className="sensor-value">0 ppm</span>
                            </div>
                            <span className="sensor-icon">✅</span>
                        </div>
                        <div className="sensor-item">
                            <div className="sensor-info">
                                <span className="sensor-name">Temperature</span>
                                <span className="sensor-value">72°F</span>
                            </div>
                            <span className="sensor-icon">🌡️</span>
                        </div>
                        <div className="sensor-item">
                            <div className="sensor-info">
                                <span className="sensor-name">Humidity</span>
                                <span className="sensor-value">45%</span>
                            </div>
                            <span className="sensor-icon">💧</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="stats-bar">
                <div className="stat">
                    <span className="stat-label">Active Sensors</span>
                    <span className="stat-value">14</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Open Contacts</span>
                    <span className="stat-value warning">2</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Battery</span>
                    <span className="stat-value">89%</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Last Event</span>
                    <span className="stat-value">2 min ago</span>
                </div>
            </div>
        </div>
    );
}

export default App;