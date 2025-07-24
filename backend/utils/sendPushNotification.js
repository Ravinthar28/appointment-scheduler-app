const { Expo } = require('expo-server-sdk');
let expo = new Expo();

async function sendPushNotification(expoPushToken, title, body) {
  if (!Expo.isExpoPushToken(expoPushToken)) {
    console.error(`Push token ${expoPushToken} is not a valid Expo push token`);
    return;
  }

  const messages = [{
    to: expoPushToken,
    sound: 'default',
    title,
    body,
  }];

  try {
    const ticketChunk = await expo.sendPushNotificationsAsync(messages);
    console.log("Push ticket:", ticketChunk);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
}

module.exports = sendPushNotification;
