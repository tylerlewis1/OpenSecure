import { useEffect, useState } from 'react';
import config from '../../config';

export default function useDashboardServices() {
    const [systemState, setSystemState] = useState({ armed: false, mode: 'disarmed' });

    useEffect(() => {
        const eventSource = new EventSource(`${config.apiBaseUrl}:${config.SERVER_PORT}/api/events`);
        
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setSystemState(data);
        };
        
        eventSource.onerror = (error) => {
            console.error('SSE error:', error);
        };
        
        return () => {
            eventSource.close();
        };
    }, []);

    return systemState;
}