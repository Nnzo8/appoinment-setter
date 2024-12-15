const { sql } = require('../config/db');

class Feedback {
    // Method to add feedback
    static async add(feedbackData) {
        const { appointmentId, custId, rating, comment } = feedbackData;

        try {
            // Execute the stored procedure to add feedback
            const { recordset } = await sql.query`
                EXEC AddFeedback 
                    @AppointmentId = ${appointmentId},
                    @CustId = ${custId},
                    @Rating = ${rating},
                    @Comment = ${comment};
            `;
            return { success: true, message: 'Feedback added successfully.' };
        } catch (error) {
            console.error(error);
            throw new Error(error.message || 'Failed to add feedback.');
        }
    }
}

module.exports = Feedback;
