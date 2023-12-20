// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMzagXVWh0ubXz5TUuM3usKfdD2plXsyE",
  authDomain: "teamcrud-c8ae0.firebaseapp.com",
  projectId: "teamcrud-c8ae0",
  storageBucket: "teamcrud-c8ae0.appspot.com",
  messagingSenderId: "720210856325",
  appId: "1:720210856325:web:c348385cb6927ae8469cec",
  measurementId: "G-1K84H4D7VF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db=getFirestore(app)