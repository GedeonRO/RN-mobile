import { initializeApp } from "firebase/app";

import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCNsZx4W68JLCV8M01GsdxcF7q8kzJR4c",
  authDomain: "mobileauth-d5793.firebaseapp.com",
  projectId: "mobileauth-d5793",
  storageBucket: "mobileauth-d5793.appspot.com",
  messagingSenderId: "898753787151",
  appId: "1:898753787151:web:9f29e30ddbf78f10327a7a",
  measurementId: "G-3EEXWRM8KG",
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const auth = getAuth(app);

// 1008351359062-5dhg78110f4s9cnj0vfci28mbqlguhh8.apps.googleusercontent.com
