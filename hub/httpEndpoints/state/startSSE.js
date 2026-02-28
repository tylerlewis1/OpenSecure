const tokenStore = require(__dirname + '../auth/tokenStore.json');
let systemState = { armed: false, mode: 'disarmed' };
let clients = [];
module.exports = async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.write(`data: ${JSON.stringify(systemState)}\n\n`);
    clients.push(res);
}