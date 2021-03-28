// import signUpWithGoogle from "firebase";
// import auth from 'firebase'
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'
import {Form, Button} from "react-bootstrap";
import firebase from "firebase/app";
require('firebase/auth')

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

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
// const signUpWithGoogle = () => auth.signInWithPopup(provider)
// export default firebase;

const Signup = () => {
    const [credentials, setCredentials] = useState({email:null, password:null})
    const loginWithGoogle = (event) => {
        auth.signInWithPopup(provider).then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorMessage)
            // ...
        });
        event.preventDefault();
    }
    async function loginWithEmail(event){
        event.preventDefault()
        // console.log(credentials.email + " " + credentials.password)
        // const userCredential = await auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        // const user = userCredential.user;
        // console.log(user)
        auth.signInWithEmailAndPassword(credentials.email, credentials.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
            });
    }
    return (
        <div className='flex'>
            <div className="box effect">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" onChange={(event) => setCredentials({password:credentials.password, email: event.target.value})}/>
                    </Form.Group>
                    <Form.Group controlId="Password">
                        <Form.Control type="password" placeholder="Password" onChange={(event) => setCredentials({email:credentials.email, password: event.target.value})}/>
                    </Form.Group>
                    <Form.Group controlId="Button">
                        <Button variant="primary" type="submit" onClick={loginWithEmail} block>
                            Log In
                        </Button>
                    </Form.Group>
                </Form>
                <Button variant="danger" type="submit" onClick={loginWithGoogle} block>
                    Sign in with Google
                </Button>
                <hr/>
                <Form>
                    <Form.Group controlId="Button">
                        <Button variant="outline-dark" type="submit" block>
                            Sign Up
                        </Button>
                    </Form.Group>
                </Form>
            </div>
            <div className='title'>
                Think Tank
            </div>
        </div>
    )
}

export default Signup