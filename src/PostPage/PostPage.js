import Post from "../home/Post";
import {useEffect, useState} from "react";
import {db} from "../firebase";
import Navigationbar from "../Navigationbar";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useSelector} from "react-redux";

const Comment = (props) => {
    const user = useSelector(state => state.user)
    let unsubscribe = null
    const [comment, setComment] = useState("")
    const [allComments, setAllComments] = useState([]);
    const addComment = async () => {
        const ref = await db.doc(`posts/${props.post.id}`).collection("comments").add({content: comment, user: user})
        console.log(`Comment written with ref ${ref.id}`);
    }

    const getComments = async () => {
        unsubscribe = await db.collection(`posts/${props.post.id}/comments`).onSnapshot(snapshot => {
            const comments = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            setAllComments(comments);
        })
    }

    useEffect(() => {
        getComments()
        return () => {
            console.log("unsubscribing to comments")
            unsubscribe()
        };
    }, [])
    return (
        <>
            <Form>
                <Row>
                    <Col md={"auto"}><img src={user.photoURL} className="post-img"/></Col>
                    <Col style={{'align-self': 'center'}}><Form.Control type="text" placeholder={`Comment`}
                                                                        onChange={(event) => setComment(event.target.value)}/>
                    </Col>
                    <Col md={"auto"} style={{'align-self': 'center'}}><Button variant="primary"
                                                                              onClick={addComment}>
                        Comment
                    </Button></Col>
                </Row>
            </Form>

            {allComments.map(comment => (
                <Row key={comment.id}>
                    <Col md={"auto"}><img src={comment.user.photoURL} className="post-img"/></Col>
                    <Col style={{'align-self': 'center'}}> {comment.content}
                    </Col>
                </Row>
            ))}
        </>
    )
}
const PostPage = (props) => {
    const [post, setPost] = useState();
    let unsubscribe = null
    const getPostFromDB = async () => {
        unsubscribe = await db.doc(`posts/${props.postid}`).onSnapshot((snapshot => {
            console.log("Subscribed to post page.....")
            setPost({id: snapshot.id, ...snapshot.data()});
        }))
    }
    useEffect(() => {
        getPostFromDB();
        return () => {
            console.log("Unsubscribed to post page.....")
            unsubscribe()
        }
    }, [])
    return (
        <>
            <Navigationbar/>
            {post && <Post post={post}/>}
            {post && <Comment post={post}/>}
        </>
    )
}


export default PostPage;