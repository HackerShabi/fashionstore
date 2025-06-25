// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKJ7-DsiHHorySHhiLvh-6N2xNta6Xieo",
  authDomain: "ecomstoreshabi.firebaseapp.com",
  projectId: "ecomstoreshabi",
  storageBucket: "ecomstoreshabi.firebasestorage.app",
  messagingSenderId: "232329632702",
  appId: "1:232329632702:web:bb52118c3e0cc176bf77ef",
  measurementId: "G-DB7NEBPBJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
