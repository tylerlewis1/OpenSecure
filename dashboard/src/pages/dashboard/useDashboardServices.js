import { useEffect, useState } from 'react';
import env from '../../../config.json';

export default function useDashboardServices() {
    const [systemState, setSystemState] = useState({ armed: false, mode: 'disarmed' });

    useEffect(() => {
        const eventSource = new EventSource(`${env.API_BASE_URL}:${env.SERVER_PORT}/api/events`, { withCredentials: true });
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

    const armHandler = async (armed) => {
        try {
            const response = await fetch(`${env.API_BASE_URL}:${env.SERVER_PORT}/api/arm`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ armed: armed }),
            });
    }         catch (error) {
            console.error('Error arming system:', error);
        }  
    };

    return { systemState, armHandler };
}