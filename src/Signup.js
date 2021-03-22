import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'
import {Form, Button} from "react-bootstrap";

const Signup = () => {
    return (
        <div className='flex'>
            <div className="box effect">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email"/>
                    </Form.Group>
                    <Form.Group controlId="Password">
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <Form.Group controlId="Button">
                        <Button variant="primary" type="submit" block>
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