import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyA00U2RYbFNZkzKhsZu8jcrdn_lri3QyCQ",
    authDomain: "tienda-utez-cf6f3.firebaseapp.com",
    projectId: "tienda-utez-cf6f3",
    storageBucket: "tienda-utez-cf6f3.firebasestorage.app",
    messagingSenderId: "84164541813",
    appId: "1:84164541813:web:9e3afb9e048fe066a9673c"
  };

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };
