import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBkKvdFK62fWVnTHYFy_BRYeTN1KdBhqCQ",
    authDomain: "thinktank-ec236.firebaseapp.com",
    projectId: "thinktank-ec236",
    storageBucket: "thinktank-ec236.appspot.com",
    messagingSenderId: "152104997182",
    appId: "1:152104997182:web:689fec32fa9cf68d9a9c6f",
    measurementId: "G-3DS0RF1K6M"
};

firebase.initializeApp(firebaseConfig);

export default firebase;