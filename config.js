import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyAt-DXD2O2MIfui9RKuQ2hLE_U3vg14xGA",
    authDomain: "bartering-applcation.firebaseapp.com",
    projectId: "bartering-applcation",
    storageBucket: "bartering-applcation.appspot.com",
    messagingSenderId: "781264548463",
    appId: "1:781264548463:web:e2e0d688283a0c2511539a"
  };
  
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();
  