const express = require('express');
const {
    insertAppointment,
    updateAppointment,
    deleteAppointment,
    fetchAppointments,
} = require('../controllers/AppointmentController');

const router = express.Router();

// Route to insert a new appointment
router.post('/add-appointment', insertAppointment);

// Route to update an appointment
router.put('/update-appointment/:appointmentId', updateAppointment);

// Route to delete an appointment
router.delete('/delete-appointment/:appointmentId', deleteAppointment);

// Route to fetch all or filtered appointments
router.get('/appointments', fetchAppointments);

module.exports = router;
