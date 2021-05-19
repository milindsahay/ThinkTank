import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import Navigationbar from "../Navigationbar";
import {useEffect, useState} from "react";
import {db, getUser, storage} from "../firebase";
import Post from "../home/Post";

const User = ({userid, isLogged}) => {
    const loggedUser = useSelector(state => state.user)

    const [user, setUser] = useState();
    const getUserFromDb = async () => {
        const userRef = getUser(userid)
        const userData = (await userRef.get()).data()
        setUser(userData)
    }
    useEffect(() => {
        getUserFromDb()
    },[])



    const posts = useSelector(state => state.posts.filter(post => post.user.uid === userid))
    let imageInput = null;
    const [profileAttributes, setProfileAttributes] = useState({});
    const submitChanges = async (event) => {
        let {displayName} = profileAttributes;
        try {
            event.preventDefault();
            if (displayName) {
                await db.doc(`users/${user.uid}`).update({displayName})
                console.log("User profile updated successfully")
            }
            if (imageInput) {
                //Storing in cloud storage and getting download url to update firestore in realtime
                //Page doesn't refresh on file upload (because of subscribing to user datastore)
                storage.ref().child(`user-profile`).child(user.uid).child(imageInput.files[0].name).put(imageInput.files[0]).then(
                    response => {
                        return response.ref.getDownloadURL()
                    }
                ).then(photoURL => {
                    db.doc(`users/${user.uid}`).update({photoURL})
                })
            }


        } catch (e) {
            console.error("error while updating user profile", e)
        }
    }
    return (
        <>
            <Navigationbar/>
            {user && <div>
                <Container className="my-container p-3">
                    <Row>
                        <Col xs={4}>
                            <img src={user.photoURL} className='usr-img'/>
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
            </div>}

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
                        <Form.Control type="file" ref={ref => imageInput = ref}/>
                    </Form.Group>
                    <Form.Group controlId="Button">
                        <Button variant="primary" type="submit" block>
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
            <Container className='my-container'>
                {posts.map(function (post) {
                    return (
                        <Post post={post} key={post.id}/>
                    )
                })}
            </Container>
        </>

    )
}

export default User;