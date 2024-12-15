const { sql } = require('../config/db'); // Import database configuration

class Appointment {
    
    // Method to insert a new appointment
    static async insert(appointmentData) {
        const { appointmentDate, appointmentTime, custId, barberId, serviceId, status } = appointmentData;

        try {
            const { recordset } = await sql.query`
                EXEC INSERT_APPOINTMENT 
                    @APPOINTMENT_DATE = ${appointmentDate},
                    @APPOINTMENT_TIME = ${appointmentTime},
                    @CUST_ID = ${custId},
                    @BARBER_ID = ${barberId},
                    @SERVICE_ID = ${serviceId},
                    @STATUS = ${status};
            `;
            return recordset[0]; // Return the newly created appointment record
        } catch (error) {
            throw new Error(`Error inserting appointment: ${error.message}`);
        }
    }

    // Method to update an appointment
    static async update(appointmentId, updatedData) {
        const { appointmentDate, appointmentTime, status } = updatedData;

        try {
            const { recordset } = await sql.query`
                EXEC UPDATE_APPOINTMENT 
                    @APPOINTMENT_ID = ${appointmentId},
                    @APPOINTMENT_DATE = ${appointmentDate},
                    @APPOINTMENT_TIME = ${appointmentTime},
                    @STATUS = ${status};
            `;
            return recordset[0]; // Return the updated appointment record
        } catch (error) {
            throw new Error(`Error updating appointment: ${error.message}`);
        }
    }

    // Method to delete an appointment
    static async delete(appointmentId) {
        try {
            await sql.query`
                EXEC DELETE_APPOINTMENT 
                    @APPOINTMENT_ID = ${appointmentId};
            `;
            return { message: 'Appointment deleted successfully.' };
        } catch (error) {
            throw new Error(`Error deleting appointment: ${error.message}`);
        }
    }

    // Method to fetch appointments based on filters
    static async fetch(filters) {
        const { startDate, endDate, barberId, status } = filters;

        try {
            const { recordset } = await sql.query`
                EXEC FETCH_APPOINTMENTS 
                    @START_DATE = ${startDate || null},
                    @END_DATE = ${endDate || null},
                    @BARBER_ID = ${barberId || null},
                    @STATUS = ${status || null};
            `;
            return recordset; // Return the list of appointments
        } catch (error) {
            throw new Error(`Error fetching appointments: ${error.message}`);
        }
    }
}

module.exports = Appointment;
