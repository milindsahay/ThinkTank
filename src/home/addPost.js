import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {db} from "../firebase";
import {useSelector} from "react-redux";

const AddPost = () => {
    const [postBody, setPostBody] = useState({});
    const user = useSelector(state => state.user)
    async function addPost(event){
        try{
            event.preventDefault();
            let post = {
                body: postBody.body,
                user: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                },
                like:{
                  count: 0,
                  users:[]
                },
                createdAt: new Date()
            }

            const docRef = await db.collection('posts').add(post)
            console.log(`Document written with id: ${docRef.id}`)
        }
        catch (e) {
            alert(e.message)
            console.log(e);
        }
    }
    return (
        <Container className="my-container p-3">

            <Form>
                <Row >
                    <Col md={"auto"}><img src={user.photoURL} className="post-img"/></Col>
                    <Col style={{'align-self':'center'}}><Form.Control type="text" placeholder={`What's on your mind, ${user.displayName}?`}
                                       onChange={(event) => setPostBody({...postBody, body: event.target.value})}/>
                    </Col>
                    <Col md={"auto"} style={{'align-self':'center'}}><Button variant="primary" type="submit" onClick={addPost}>
                        Post
                    </Button></Col>
                </Row>
            </Form>
        </Container>
    )
}

export default AddPost;