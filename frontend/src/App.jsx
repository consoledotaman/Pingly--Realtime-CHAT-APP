import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { Toaster } from "react-hot-toast";
import { Routes ,Route, Navigate} from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore.js';
import { Loader } from 'lucide-react';
import { useThemeStore } from './store/useThemeStore.js';
import { messaging, getToken, onMessage } from "./firebase";
import axios from "axios";

const App = () => {
 

  const {authUser,checkAuth, isCheckingAuth} = useAuthStore();
  const {theme} = useThemeStore();
  useEffect(() => {
  if (authUser?._id) {
    askPermissionAndGetToken();
  }

  onMessage(messaging, (payload) => {
    alert(payload.notification?.title + ": " + payload.notification?.body);
  });
}, [authUser]);

  const askPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notifications not granted");
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    const fcmToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });


    console.log("✅ FCM Token:", fcmToken);

    const { authUser } = useAuthStore.getState();
    if (!authUser?._id) {
      console.warn("No authUser found when saving token");
      return;
    }

    const res = await axios.post("/api/notifications/save-token", {
      token: fcmToken,
      userId: authUser._id,
    });

    console.log("✅ Token saved to backend:", res.data);
  } catch (err) {
    console.error("askPermissionAndGetToken error:", err);
    if ('PushManager' in window) {
    const sw = await navigator.serviceWorker.ready;
    const subs = await sw.pushManager.getSubscription();
    console.log("📦 Current Push Subscription:", subs);
}  
  }
};



  
  useEffect(() =>{
    checkAuth();

  },[checkAuth]);

  console.log({ authUser });

  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen w-screen'>
      <Loader className="size-10 animate-spin"/>
    </div>
  )

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser != null ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />

      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default App