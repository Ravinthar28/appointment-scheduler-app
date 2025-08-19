const mongoose = require("mongoose");

const appointmentModel = require("./appointmentsModel");
const secretarySchema = new mongoose.Schema({
  name: String,
  phoneNo: Number,
  mailId: {
    type: String,
    unique: true,
  },
  password: String,
  pendingAppointments: [appointmentModel],
  confirmedAppointments: [appointmentModel],
  pastAppointments: [appointmentModel],
  canceledAppointments: [appointmentModel],
  expoPushToken: String,
});

module.exports = secretarySchema;