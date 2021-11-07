import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA_SJRWQaIc8pXOC3oIwalmzu1A20_48MU",
  authDomain: "react-image-gallery-a9785.firebaseapp.com",
  projectId: "react-image-gallery-a9785",
  storageBucket: "react-image-gallery-a9785.appspot.com",
  messagingSenderId: "656933700242",
  appId: "1:656933700242:web:6ebf89b006b1cafd211c4b",
  measurementId: "G-R9QM5Q1696",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
