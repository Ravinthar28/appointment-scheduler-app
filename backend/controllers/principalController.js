const mongoose = require("mongoose");

// SCHEMA
const registerSchema = require("../models/registerModel");

// FUNCTION TO APPEND APPOINTMENT REQUESTS FROM THE STAFF TO THE PRINCIPAL'S PENDING APPOINTMNETS TAB
const newAppointment = async (userData) => {
  try {
    const collectionName = userData.collegeCode;
    const schema =
      mongoose.models[collectionName] ||
      mongoose.model(collectionName, registerSchema);
    const user = await schema.findOne({ "staffs.mailId": userData.email });
    const staff = user.staffs.find((data) => data.mailId === userData.email);
    if (!user) return 500;
    const model = await schema.findOneAndUpdate(
      { "staffs.mailId": userData.email },
      {
        $push: {
          "principal.pendingAppointments": {
            userName: staff.name,
            userEmail: staff.mailId,
            desc: userData.desc,
            dateTime: userData.dateTime,
          },
        },
      },
      { new: true, upsert: false }
    );

    if (model) return 200;
    else return 500;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

// FUNCTION TO SEND THE PENDING APPOINTMENTS DATA FROM DB TO THE PRINCIPAL'S PENDING APPOINTMENTS TAB
const pendingAppointments = async (userData) => {
  try {
    const collectionName = userData.collegeCode;
    const schema =
      mongoose.models[collectionName] ||
      mongoose.model(collectionName, registerSchema);
    const user = await schema.findOne({});
    const responseData = {
      pendingAppointments: user.principal.pendingAppointments,
      confirmedAppointments: user.principal.confirmedAppointments,
      pastAppointments: user.principal.pastAppointments,
    };
    if (user) return responseData;
    else return 500;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

// FUNCTION FOR ACCEPTING THE PENDING APPOINTMENTS BASED ON THE TIME ASIGNED BY THE STAFF
const acceptAppointment = async (userData) => {
  try {
    const msgData = {
      id: userData.selectedMeeting.id,
      userName: userData.selectedMeeting.userName,
      userEmail: userData.selectedMeeting.userEmail,
      desc: userData.selectedMeeting.desc,
      dateTime: userData.selectedMeeting.dateTime,
    };
    const collectionName = userData.selectedMeeting.collegeCode;
    const schema =
      mongoose.models[collectionName] ||
      mongoose.model(collectionName, registerSchema);

    if (userData.selectedTab === "pending") {
      // STORES THE ACCEPTED APPOINTMENT IN STAFF'S UPCOMMING APPOINTMENTS
      const staffUpdate = await schema.findOneAndUpdate(
        { "staffs.mailId": userData.selectedMeeting.userEmail },
        { $push: { "staffs.$.upcomingAppointments": msgData } },
        { new: true, upsert: false }
      );

      // STORE THE ACCEPTED APPOINTMENT IN PRINCIPALS CONFIRMEND APPOINTMENTS
      const principalUpdate = await schema.findOneAndUpdate(
        {},
        { $push: { "principal.confirmedAppointments": msgData } },
        { new: true, upsert: false }
      );

      // REMOVES THE ACCEPTED APPOINTMENT FROM THE PRINCIPALS PENDING APPOINTMENTS
      const removeAppointment = await schema.findOneAndUpdate(
        { "principal.pendingAppointments.id": userData.selectedMeeting.id },
        {
          $pull: {
            "principal.pendingAppointments": {
              id: userData.selectedMeeting.id,
            },
          },
        },
        { new: true }
      );
      if (staffUpdate && principalUpdate && removeAppointment) return 200;
      else return 500;
    }
    if (userData.selectedTab === "confirmed") {
      const principal = await schema.findOneAndUpdate(
        { "principal.confirmedAppointments.id": userData.selectedMeeting.id },
        {
          $set: {
            "principal.confirmedAppointments.$.dateTime":
              userData.selectedMeeting.dateTime,
          },
        },
        { new: true, upsert: false }
      );
      const staff = await schema.findOneAndUpdate(
        {
          "staffs.upcomingAppointments.id": userData.selectedMeeting.id,
        },
        {
          $set: {
            "staffs.$[staff].upcomingAppointments.$[appt].dateTime":
              userData.selectedMeeting.dateTime,
          },
        },
        {
          new: true,
          arrayFilters: [
            { "staff.upcomingAppointments.id": userData.selectedMeeting.id },
            { "appt.id": userData.selectedMeeting.id },
          ],
        }
      );

      if (principal && staff) return 200;
      else return 500;
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { newAppointment, pendingAppointments, acceptAppointment };
