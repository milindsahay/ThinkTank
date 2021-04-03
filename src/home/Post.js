import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect} from "react";
import {db} from "../firebase";

const Post = ({posts, setPosts}) => {
    useEffect(() => {
        async function documents() {
        const querySnapshot = await db.collection('posts').get()
        let myposts = [];
        querySnapshot.docs.map(doc => myposts.push({id:doc.id, ...doc.data()}))
            console.log(querySnapshot)
        setPosts(myposts)
    }
    documents()
    }, [])
    const deletePost = async (id) => {
        try{
            // event.preventDefault();
            await db.doc(`posts/${id}`).delete();
            const newPosts = posts.filter(post => post.id != id)
            setPosts([...newPosts]);
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