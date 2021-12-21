// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDZ5bTQ30HROpKwu8idffZDtcFU91NuI-o",
    authDomain: "clone-329a0.firebaseapp.com",
    projectId: "clone-329a0",
    storageBucket: "clone-329a0.appspot.com",
    messagingSenderId: "969612943376",
    appId: "1:969612943376:web:4360432a7c2ca71eccea95",
    measurementId: "G-V52766485K"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();


  export { db, auth };