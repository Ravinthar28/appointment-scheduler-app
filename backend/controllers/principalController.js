const mongoose = require("mongoose");

// SCHEMA
const registerSchema = require("../models/registerModel");

// NOTIFICATION
const sendPushNotification = require('../utils/sendPushNotification');

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


    const checkDateTime = await schema.find({'principal.confirmedAppointments.dateTime':userData.dateTime});
    if(checkDateTime.length != 0) return("date-not-available"); 

    const model = await schema.findOneAndUpdate(
      { "staffs.mailId": userData.email },
      {
        $push: {
          "principal.pendingAppointments": {
            userName: staff.name,
            userEmail: staff.mailId,
            desc: userData.desc,
            dateTime: userData.dateTime,
            collegeCode:collectionName,
            appointmentWith:userData.appointmentWith
          },
        },
      },
      { new: true, upsert: false }
    );


    const users = await schema.findOne({})
    const principalToken = users.principal.expoPushToken;

    await sendPushNotification(principalToken,"Appointment Request",`You have a new appointment request from ${staff.name}`)


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

// FUNCTION FOR ACCEPTING THE PENDING APPOINTMENTS BASED ON THE TIME ASIGNED BY THE STAFF AND RESCHEDULING THE APPOINTMENT BY THE PRINCIPAL
const acceptAppointment = async (userData) => {

    // FUNCTION TO EXTRACT THE DATE AND TIME FORMAT
  const extractDateTime = (dateTime) => {
    const dateObject = new Date(dateTime);
    const date = dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = `${(dateObject.getHours() > 12)? dateObject.getHours()-12: dateObject.getHours()}:${dateObject.getMinutes()} ${(dateObject.getHours() > 12) ? 'PM' : 'AM'}`;

    return `${date}, ${time}`;
  };

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

    
    const checkDateTime = await schema.find({'principal.confirmedAppointments.dateTime':msgData.dateTime});
    if(checkDateTime.length != 0) return "date-not-available"; 

    const users = await schema.findOne({"staffs.mailId":userData.selectedMeeting.userEmail});
    const staff = users.staffs.find(data => data.mailId == userData.selectedMeeting.userEmail);
    const staffToken = staff.expoPushToken;

    

    if (userData.selectedTab === "pending" || userData.selectedTab === "past") {
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

      if(userData.selectedTab === 'pending'){
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
      }

    await sendPushNotification(staffToken,"Appointment Scheduled",`Your appointment with the principal is scheduled on ${extractDateTime(userData.selectedMeeting.dateTime)}`);

      if (staffUpdate && principalUpdate) return 'success';
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

    await sendPushNotification(staffToken,"Appointment Scheduled",`Your appointment with the principal is scheduled on ${extractDateTime(userData.selectedMeeting.dateTime)}`);

      if (principal && staff) return 'success';
      else return 500;
    }
  } catch (error) {
    console.log(error);
  }
};

// FUNCTION TO CANCEL THE APPOINTMENT BY THE PRINCIPAL
const cancelAppointment = async (userData)=>{
  try{

    const msgData = {
      id: userData.selectedMeeting.id,
      userName: userData.selectedMeeting.userName,
      userEmail: userData.selectedMeeting.userEmail,
      desc: userData.selectedMeeting.desc,
      dateTime: userData.selectedMeeting.dateTime,
    };

    const collectionName = userData.selectedMeeting.collegeCode;
    const schema = mongoose.models[collectionName] || mongoose.model(collectionName,registerSchema);

    let removed = false;
    // TO CANCEL THE APPOINTMENT FROM CONFIRMED TAB
    if(userData.selectedTab == 'confirmed'){
      const updatePrincipal = await schema.findOneAndUpdate(
      {'principal.confirmedAppointments.id':userData.selectedMeeting.id},
      {$pull:{'principal.confirmedAppointments':{id:userData.selectedMeeting.id}}},
      {new:true,upsert:false}
    );
    const updateStaff = await schema.findOneAndUpdate(
      {'staffs.mailId':userData.selectedMeeting.userEmail},
      {$pull:{'staffs.$.upcomingAppointments':{id:userData.selectedMeeting.id}}},
      {new:true,upsert:false}
    );
    if(updatePrincipal && updateStaff) removed = true;
    }

    // TO CANCEL THE APPOINTMENT FROM PAST TAB
    if(userData.selectedTab == 'pending'){
      const updatePrincipal = await schema.findOneAndUpdate(
      {'principal.pendingAppointments.id':userData.selectedMeeting.id},
      {$pull:{'principal.pendingAppointments':{id:userData.selectedMeeting.id}}},
      {new:true,upsert:false}
    );
    if(updatePrincipal) removed = true;
    }
    
    const updatePrincipalCanceled = await schema.findOneAndUpdate(
      {},
      {$push:{'principal.canceledAppointments':msgData}},
      {new:true,upsert:false}
    );

    const updateStaffCanceled = await schema.findOneAndUpdate(
      {'staffs.mailId':msgData.userEmail},
      {$push:{'staffs.$.canceledAppointments':msgData}},
      {new:true,upsert:false}
    );

    const users = await schema.findOne({'staffs.mailId':msgData.userEmail});
    const staff = users.staffs.find(data => data.mailId === msgData.userEmail);
    const expoPushToken = staff.expoPushToken;
    await sendPushNotification(expoPushToken,'Appointment Canceled','Your Appointment was canceled by the principal');
    
    if(removed && updatePrincipalCanceled && updateStaffCanceled) return true;
  }
  catch(error){
    console.log(error);
  }
}
module.exports = { newAppointment, pendingAppointments, acceptAppointment,cancelAppointment };
