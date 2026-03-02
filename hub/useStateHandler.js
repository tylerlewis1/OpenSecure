const fs = require('fs');
const path = require('path');

function useStateHandler() {
    const getState = async () => {
        return await JSON.parse(fs.readFileSync(path.join(__dirname, 'state.json'), 'utf8'));
    };
    
    const updateState = (newState) => {
        fs.writeFile(path.join(__dirname, 'state.json'), JSON.stringify(newState, null, 2), (err) => {
            if (err) {
                console.error('Error writing state file:', err);
                return;
            }
            console.log('State updated successfully');
            
            // Import clients only when needed to avoid circular dependency
            const { clients } = require('./httpEndpoints/state/startSSE.js');
            clients.forEach(client => {
                client.write(`data: ${JSON.stringify(newState)}\n\n`);
            });
        });
    };

    return { 
        getState,
        updateState
    };
}

module.exports = useStateHandler;