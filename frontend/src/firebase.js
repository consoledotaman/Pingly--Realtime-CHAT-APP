// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCIg6uwzPZaKcW2IGFbNOG4So7VJuWqUgg",
  authDomain: "pingly-a8cc2.firebaseapp.com",
  projectId: "pingly-a8cc2",
  storageBucket: "pingly-a8cc2.appspot.com",
  messagingSenderId: "437077713761",
  appId: "1:437077713761:web:76ed8197c5d0685fd8db20",
  measurementId: "G-8R4YY4TWV4"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging, getToken, onMessage };
