// backend/src/lib/firebaseAdmin.js
import admin from "firebase-admin";
import fs from "fs";

// ✅ Use fs to load JSON
const serviceAccount = JSON.parse(
  fs.readFileSync("backend/firebase-service-account.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendPushNotification = async (fcmToken, title, body) => {
  try {
    const message = {
      notification: { title, body },
      token: fcmToken,
    };
    const response = await admin.messaging().send(message);
    console.log("✅ Notification sent:", response);
  } catch (error) {
    console.error("❌ Failed to send notification:", error);
  }
};
