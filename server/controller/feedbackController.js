const Feedback = require('../models/Feedback');

// ADD FEEDBACK CONTROLLER
const addFeedback = async (req, res) => {
    const { appointmentId, custId, rating, comment } = req.body;

    try {
        // Validate input
        if (!appointmentId || !custId || !rating || rating < 1 || rating > 5 || !comment?.trim()) {
            return res.status(400).json({ status: 400, message: 'Invalid input. Ensure all fields are filled and rating is between 1 and 5.' });
        }

        // Call the add method of the Feedback model
        const result = await Feedback.add({ appointmentId, custId, rating, comment });

        return res.status(201).json({ status: 201, message: result.message });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'An error occurred. Try again later.', details: error.message });
    }
};

module.exports = { addFeedback };
