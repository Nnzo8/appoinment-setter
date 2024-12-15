const Appointment = require('../models/Appointment');

// INSERT APPOINTMENT CONTROLLER
const insertAppointment = async (req, res) => {
    const { appointmentDate, appointmentTime, custId, barberId, serviceId, status } = req.query;

    try {
        // Validate input
        if (
            !appointmentDate || !appointmentTime || !custId || !barberId || !serviceId ||
            !['Pending', 'Confirmed', 'Cancelled', 'Completed'].includes(status)
        ) {
            return res.status(400).json({ status: 400, message: 'Invalid input. Please check all fields.' });
        }

        // Call the insert method of the Appointment model
        const appointment = await Appointment.insert({
            appointmentDate,
            appointmentTime,
            custId,
            barberId,
            serviceId,
            status,
        });

        return res.status(201).json({ status: 201, message: 'Appointment created successfully!', data: appointment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'An error occurred. Try again later.', details: error.message });
    }
};

// UPDATE APPOINTMENT CONTROLLER
const updateAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const { appointmentDate, appointmentTime, status } = req.query;

    try {
        // Validate input
        if (!appointmentId || !appointmentDate || !appointmentTime || !['Pending', 'Confirmed', 'Cancelled', 'Completed'].includes(status)) {
            return res.status(400).json({ status: 400, message: 'Invalid input. Please check all fields.' });
        }

        // Call the update method of the Appointment model
        const appointment = await Appointment.update(appointmentId, { appointmentDate, appointmentTime, status });

        return res.status(200).json({ status: 200, message: 'Appointment updated successfully!', data: appointment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'An error occurred. Try again later.', details: error.message });
    }
};

// DELETE APPOINTMENT CONTROLLER
const deleteAppointment = async (req, res) => {
    const { appointmentId } = req.params;

    try {
        // Validate input
        if (!appointmentId) {
            return res.status(400).json({ status: 400, message: 'Appointment ID is required.' });
        }

        // Call the delete method of the Appointment model
        const result = await Appointment.delete(appointmentId);

        return res.status(200).json({ status: 200, message: result.message });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'An error occurred. Try again later.', details: error.message });
    }
};

// FETCH APPOINTMENTS CONTROLLER
const fetchAppointments = async (req, res) => {
    const { startDate, endDate, barberId, status } = req.query;

    try {
        // Call the fetch method of the Appointment model
        const appointments = await Appointment.fetch({ startDate, endDate, barberId, status });

        return res.status(200).json({ status: 200, data: appointments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'An error occurred. Try again later.', details: error.message });
    }
};

module.exports = {
    insertAppointment,
    updateAppointment,
    deleteAppointment,
    fetchAppointments,
};
