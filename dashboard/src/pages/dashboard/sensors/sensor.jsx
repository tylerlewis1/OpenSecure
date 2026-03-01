import React from 'react';
import '../dashboard.css';
export default function Sensor({ name, type, status }) {
    return (
        <div className={`sensor-item ${status.toLowerCase()}`}>
            <div className="sensor-info">
                <span className="sensor-name">{name}</span>
                <span className="sensor-status">{status}</span>
            </div>
            <span className="sensor-icon">{status === 'Open' ? '⚠️' : '✅'}</span>
        </div>
    );
}