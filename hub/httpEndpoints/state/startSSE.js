import state from '../../state.json' with { type: 'json' };
export let clients = [];

export default async (req, res) => {
    // 1. Critical SSE Headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    res.write(`data: ${JSON.stringify(state)}\n\n`);

    clients.push(res);

    req.on('close', () => {
        clients = clients.filter(client => client !== res);
        res.end();
    });
    return {clients};
};