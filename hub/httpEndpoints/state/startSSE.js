const fs = require('fs');
const path = require('path');

let clients = [];

module.exports = async (req, res) => {
    const state = JSON.parse(fs.readFileSync(path.join(__dirname, '../../state.json'), 'utf8'));
    
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    res.write(`data: ${JSON.stringify(state)}\n\n`);

    clients.push(res);

    req.on('close', () => {
        clients = clients.filter(client => client !== res);
        res.end();
    });
};

module.exports.clients = clients;