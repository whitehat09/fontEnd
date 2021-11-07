
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCY6V8IBLkOE_AY96_tm_c_2YXGQWSDZzA",
  authDomain: "shop-t-3a83e.firebaseapp.com",
  projectId: "shop-t-3a83e",
  storageBucket: "shop-t-3a83e.appspot.com",
  messagingSenderId: "599600156665",
  appId: "1:599600156665:web:867ba34f4c056c268f3728",
  measurementId: "G-4GK4H3BWHZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
// const admin = firebase.admin();

auth.useEmulator('http://localhost:9099');// không dùng trực tiếp mà dùng Emulator
if(window.location.hostname ==='localhost'){
  db.useEmulator('localhost',8080);
}
export {db , auth};
export default firebase;