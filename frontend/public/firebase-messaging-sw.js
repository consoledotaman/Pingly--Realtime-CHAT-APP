// public/firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCIg6uwzPZaKcW2IGFbNOG4So7VJuWqUgg",
  authDomain: "pingly-a8cc2.firebaseapp.com",
  projectId: "pingly-a8cc2",
  storageBucket: "pingly-a8cc2.appspot.com",
  messagingSenderId: "437077713761",
  appId: "1:437077713761:web:76ed8197c5d0685fd8db20",
  measurementId: "G-8R4YY4TWV4"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
