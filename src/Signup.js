import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'
import {Form, Button} from "react-bootstrap";
import firebase from "firebase";

const Signup = () => {
    const [credentials, setCredentials] = useState({email:null, password:null})
    async function loginWithEmail(event){
        event.preventDefault()
        console.log(credentials.email + " " + credentials.password)
        const userCredential = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        const user = userCredential.user;
        console.log(user)
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
                <Button variant="danger" type="submit" block>
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