import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import {db} from "../firebase";

const AddPost = ({user, posts, setPosts}) => {
    const [postBody, setPostBody] = useState({});
    async function addPost(event){
        try{
            event.preventDefault();
            let post = {
                title: postBody.title,
                body: postBody.body,
                userID: user.user.uid,
                createdAt: new Date().toString()
            }

            const docRef = await db.collection('posts').add(post)
            setPosts([{id:docRef.id, ...post}, ...posts])
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