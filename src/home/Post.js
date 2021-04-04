import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect} from "react";
import {db} from "../firebase";

const Post = ({posts, setPosts}) => {
    useEffect(() => {
        async function documents() {
            await db.collection('posts').onSnapshot(snapshot => {
            let myposts = [];
            snapshot.docs.map(doc => myposts.push({id:doc.id, ...doc.data()}))
            setPosts(myposts)
        })
    }
    documents()
    // cleanup fn required
    }, [])

    const deletePost = async (id) => {
        try{
            await db.doc(`posts/${id}`).delete();
        }
        catch (e) {
            alert(e.message);
            console.log(`error while deleting document ${e}`)
        }
    }
    return (

        <Container className='my-container'>
            {posts.map( function (post){
                return(
                <Container className="my-container">
                    <Row><Col><strong>{post.title}</strong></Col></Row>
                    <Row><Col>
                        <div>{post.body}</div>
                    </Col></Row>
                    <Row className="bottom-bar">
                        <Col className="pt-2">Posted by {post.uid}</Col>
                        <Col className="p-2">Time: {post.createdAt}</Col>
                        <Col className="p-2"><Button variant="danger" onClick={()=>deletePost(post.id)}>Delete</Button></Col>
                    </Row>
                </Container>
                )
            })}
        </Container>
    )
}

export default Post;