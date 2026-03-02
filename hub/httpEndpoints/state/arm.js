const useStateHandler = require('../../useStateHandler.js');
const { getState, updateState } = useStateHandler();

module.exports = async function arm(req, res) {
    try {
        if (typeof req.body.armed !== 'boolean') return res.status(400).json({ message: "Invalid 'armed' value. Must be a boolean." });
        const armed = req.body.armed;
        const state = await getState();
        state.Armed = armed;
        updateState(state);
        res.status(200).json(state);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving state", error: err.message });
    }
};
