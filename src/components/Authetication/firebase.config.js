import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJNOzT6VS1kEFnU6n7xrlMaw_t2Tf8668",
  authDomain: "hadas-dace1.firebaseapp.com",
  projectId: "hadas-dace1",
  storageBucket: "hadas-dace1.appspot.com",
  messagingSenderId: "372786875226",
  appId: "1:372786875226:web:62c96edf13c3ce9e070163",
  measurementId: "G-RZG4LHDSNR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;