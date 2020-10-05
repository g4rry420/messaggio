import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCAfIRGGAA4C3qzwWiUZ68N9LhHDJV-kWo",
    authDomain: "messaggio-2247e.firebaseapp.com",
    databaseURL: "https://messaggio-2247e.firebaseio.com",
    projectId: "messaggio-2247e",
    storageBucket: "messaggio-2247e.appspot.com",
    messagingSenderId: "952307065289",
    appId: "1:952307065289:web:1745d7680f9c3a02de8818",
    measurementId: "G-ZVVC1MBWFM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;