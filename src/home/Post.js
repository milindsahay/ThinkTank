import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect} from "react";
import {db} from "../firebase";
import {store} from "../redux_store";
import {useSelector} from "react-redux";


const Post = () => {
    const posts = useSelector(state => state.posts)
    useEffect(() => {
        async function documents() {
            await db.collection('posts').onSnapshot(snapshot => {
            let myposts = [];
            snapshot.docs.map(doc => myposts.push({id:doc.id, ...doc.data()}))
                store.dispatch({type:'posts/set', posts: myposts})

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
                <Container className="post-container" key={post.id}>
                    <Row>
                        <Col md="auto"><img src={post.user && post.user.photoURL} className="post-img" alt="picture"/></Col>
                        <Col>
                            <Row><Col style={{'font-size':'25px', padding:'0', margin:'0', 'font-weight':'bold', 'line-height': '30px', 'margin-top': '1%', 'margin-bottom':'3px'}}>{post.user && post.user.displayName}</Col></Row>
                            <Row><Col style={{ 'line-height': '80%', padding:'0', 'font-size': '12px' }}>{post && post.createdAt}</Col></Row>
                        </Col>
                    </Row>
                    <Row><Col><strong>{post.title}</strong></Col></Row>
                    <Row><Col>
                        <div>{post.body}</div>
                    </Col></Row>
                    <Row className="bottom-bar">
                        <Col className="pt-2">Posted by {post.user && post.user.displayName}</Col>
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