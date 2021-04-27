import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import Navigationbar from "../Navigationbar";
import {useState} from "react";
import {db} from "../firebase";

const User = () => {
    const user = useSelector(state => state.user)
    let imageInput = null;
    const [profileAttributes, setProfileAttributes] = useState({});
    const submitChanges = async (event) => {
        try{
            event.preventDefault();
            await db.doc(`users/${user.uid}`).update({displayName: profileAttributes.displayName})
            console.log("User profile updated successfully")

        }
        catch (e) {
            console.error("error while updating user profile", e)
        }
    }
    return (
        <>
            <Navigationbar/>
            <div>
                <Container className="my-container p-3">
                    <Row>
                        <Col xs={4}>
                            <img src={user.photoURL}/>
                        </Col>
                        <Col>
                            <div>
                                Name : {user.displayName}
                            </div>
                            <div>
                                Email : {user.email}
                            </div>
                            <div>
                                Last Login : {new Date().toString()}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="my-container p-3">
                <Form onSubmit={submitChanges}>
                    <Form.Group controlId="DisplayName">
                        <Form.Control type="text" placeholder="Display Name"
                                      onChange={(event) => setProfileAttributes({
                                          ...profileAttributes,
                                          displayName: event.target.value
                                      })}/>
                    </Form.Group>
                    <Form.Group controlId="Image">
                        <Form.Control type="file" ref={ref => imageInput = ref} />
                    </Form.Group>
                    <Form.Group controlId="Button">
                        <Button variant="primary" type="submit" block>
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        </>

    )
}

export default User;