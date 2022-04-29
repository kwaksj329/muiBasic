// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCSdO1xEBF4jvITe3FovygrZP4xViTgu4c",
  authDomain: "practical-coding-c9be0.firebaseapp.com",
  projectId: "practical-coding-c9be0",
  storageBucket: "practical-coding-c9be0.appspot.com",
  messagingSenderId: "399686254084",
  appId: "1:399686254084:web:45e6e324b8c407cbc67f51",
  measurementId: "G-V4KSRXNZ4Y"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;