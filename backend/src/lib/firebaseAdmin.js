// firebaseAdmin.js
import admin from "firebase-admin";
import serviceAccount from "../firebase-service-account.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendPushNotification = async (fcmToken, title, body) => {
  const message = {
    notification: {
      title,
      body,
    },
    token: fcmToken,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Notification sent:", response);
  } catch (err) {
    console.error("❌ Error sending notification:", err);
  }
};
