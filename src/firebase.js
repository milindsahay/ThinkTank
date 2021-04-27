import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore';

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

export const db = firebase.firestore();
export const auth = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider()

export const addNewUser = async (user, additionalDetails) => {
    if(!user) return null
    const snapshot = await db.doc(`users/${user.uid}`).get()
    if(!snapshot.exists){
        await db.collection('users').doc(`${user.uid}`).set({
            email: user.email,
            ...additionalDetails
        })
    }
    return getUser(user.uid)
}

export const getUser = (uid) => {
    if(!uid) return null;
    return db.collection('users').doc(`${uid}`)
}