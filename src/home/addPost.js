import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import {db} from "../firebase";
import{store} from "../redux_store";

const AddPost = () => {
    const [postBody, setPostBody] = useState({});
    async function addPost(event){
        try{
            event.preventDefault();
            const user = store.getState().user
            let post = {
                title: postBody.title,
                body: postBody.body,
                user: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                },
                createdAt: new Date().toString()
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
                <Form.Group controlId="Title">
                    <Form.Control type="text" placeholder="Title"
                                  onChange={(event) => setPostBody({...postBody, title: event.target.value})}/>
                </Form.Group>
                <Form.Group controlId="body">
                    <Form.Control type="text" placeholder="Body"
                                  onChange={(event) => setPostBody({...postBody, body: event.target.value})}/>
                </Form.Group>
                <Form.Group controlId="Button">
                    <Button variant="primary" type="submit" onClick={addPost} block>
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default AddPost;