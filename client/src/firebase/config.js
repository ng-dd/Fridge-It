import firebase from 'firebase';
// import FB from '../../../firebase.json';

// Config file from Firebase project console. Hidden values found in firebase.json.
var config = {
    apiKey: "AIzaSyDgMadKxSQJovnY0oXHvbrnbAZXizY9CFY",
    authDomain: "please-3e697.firebaseapp.com",
    databaseURL: "https://please-3e697.firebaseio.com",
    projectId: "please-3e697",
    storageBucket: "please-3e697.appspot.com",
    messagingSenderId: "318945004499"
  };
  
firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;