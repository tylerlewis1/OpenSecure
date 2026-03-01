const useStateHandler = require('../../useStateHandler.js');
const { getState, updateState } = useStateHandler();

module.exports = function arm(req, res) {
    try {
        const armed = req.body.armed;
        const state = getState();
        state.Armed = armed;
        updateState(state);
        res.status(200).json(state);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving state", error: err.message });
    }
};
