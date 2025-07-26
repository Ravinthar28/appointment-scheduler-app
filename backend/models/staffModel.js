const mongoose = require("mongoose");

const appointmentModel = require("./appointmentsModel");
const staffSchema = new mongoose.Schema({
  name: String,
  phoneNo: Number,
  mailId: {
    type: String,
    unique: true,
  },
  password: String,
  upcomingAppointments: [appointmentModel],
  pastAppointments: [appointmentModel],
  canceledAppointments: [appointmentModel],
  expoPushToken: String,
});

module.exports = staffSchema;
