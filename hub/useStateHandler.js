import fs from 'fs';
import {clients} from './httpEndpoints/state/startSSE.js';
import state from './state.json' with { type: 'json' };


export default function useStateHandler() {
    const getState = () => {
        return state;
    };
    
    const updateState = (newState) => {
        fs.writeFile('./state.json', JSON.stringify(newState, null, 2), (err) => {
            if (err) {
                console.error('Error writing state file:', err);
            } else {
                console.log('State updated successfully');
                Object.assign(state, newState);
                //update dashboard clients
                clients.forEach(client => {
                    client.write(`data: ${JSON.stringify(state)}\n\n`);
                });
            }
        });
    };

    return { 
        getState,
        updateState
    };
}
