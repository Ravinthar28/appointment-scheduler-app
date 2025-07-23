const cron = require('node-cron');
const mongoose = require('mongoose');
const registerSchema = require('./models/registerModel');

cron.schedule('* * * * *', async () => {
  try {

    const allCollections = await mongoose.connection.db.listCollections().toArray();

    // You can apply a better filter based on your naming pattern
    const principalCollections = allCollections
      .filter(col => /^[a-zA-Z0-9]+$/.test(col.name)) // adjust this regex based on your naming convention
      .map(col => col.name);

    for (const collectionName of principalCollections) {
      const DynamicModel = mongoose.model(collectionName, registerSchema, collectionName);

      const now = new Date();

      const docs = await DynamicModel.find({
        "staffs.upcomingAppointments.dateTime": { $lte: now }
      });

      for (const doc of docs) {
        for (const staff of doc.staffs) {
          const past = staff.upcomingAppointments.filter(a => new Date(a.dateTime) <= now);
          staff.pastAppointments.push(...past);
          staff.upcomingAppointments = staff.upcomingAppointments.filter(a => new Date(a.dateTime) > now);
        }
        await doc.save();
      }

      // Principal part
      await DynamicModel.updateMany(
        { "principal.confirmedAppointments.dateTime": { $lte: now } },
        [{
          $set: {
            "principal.pastAppointments": {
              $concatArrays: ["$principal.pastAppointments", {
                $filter: {
                  input: "$principal.confirmedAppointments",
                  as: "appt",
                  cond: { $lte: ["$$appt.dateTime", now] }
                }
              }]
            },
            "principal.confirmedAppointments": {
              $filter: {
                input: "$principal.confirmedAppointments",
                as: "appt",
                cond: { $gt: ["$$appt.dateTime", now] }
              }
            }
          }
        }]
      );
    }
  } catch (err) {
    console.error('❌ Cron job error:', err);
  }
});
