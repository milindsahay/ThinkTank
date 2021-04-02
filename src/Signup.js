import {useState} from "react";
import {navigate} from "@reach/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'
import {Form, Button} from "react-bootstrap";
import {auth, provider} from "./firebase";


const Signup = ({user, setUser}) => {
    const [credentials, setCredentials] = useState({email:null, password:null})
    const loginWithGoogle =  async (event) => {
        try{
            event.preventDefault();
            const result = await auth.signInWithPopup(provider)
            setUser(result.user)
            navigate('/home')
            console.log(result)
        }
        catch (e) {
            alert(e.message)
            console.log(e)
        }
    }
    async function loginWithEmail(event){
        try {
            event.preventDefault()
            const userCredential = await auth.signInWithEmailAndPassword(credentials.email, credentials.password)
            setUser(userCredential)
            navigate('/home')
            console.log(userCredential)
        }
        catch (e) {
            alert(e.message)
            console.log(e)

        }
    }
    async  function signUpWithEmail(event){
        try{
            event.preventDefault();
            const userCredential = await auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
            console.log(userCredential)
        }
        catch (e) {
            alert(e.message)
            console.log(e)

        }
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
                        <Button variant="outline-dark" type="submit" onClick={signUpWithEmail} block>
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