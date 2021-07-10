import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCfpJdkkkF2dZDEglLQ-WyOTMM4ELEeoYI",
  authDomain: "study-pane.firebaseapp.com",
  projectId: "study-pane",
  storageBucket: "study-pane.appspot.com",
  messagingSenderId: "189172656613",
  appId: "1:189172656613:web:4075f6cc190014a2a0a70c",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuthentication = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuthentication, timestamp };
