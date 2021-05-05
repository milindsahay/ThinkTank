import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect} from "react";
import {db} from "../firebase";
import {store} from "../redux_store";
import {useSelector} from "react-redux";
import CancelIcon from '@material-ui/icons/Cancel';
import AlarmIcon from '@material-ui/icons/Alarm';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatIcon from '@material-ui/icons/Chat';

const Post = () => {
    const posts = useSelector(state => state.posts)
    const loggedUser = useSelector(state => state.user)
    useEffect(() => {
        async function documents() {
            await db.collection('posts').onSnapshot(snapshot => {
                let myposts = [];
                snapshot.docs.map(doc => myposts.push({id: doc.id, ...doc.data()}))
                store.dispatch({type: 'posts/set', posts: myposts})

            })
        }

        documents()
        // cleanup fn required
    }, [])

    const deletePost = async (id) => {
        try {
            await db.doc(`posts/${id}`).delete();
        } catch (e) {
            alert(e.message);
            console.log(`error while deleting document ${e}`)
        }
    }

    const handleLike = async (post) => {
        console.log("inside handle like")
        if(!post.id) return;
        const {like} = post
        console.log(like)
        console.log(like && like.users && like.users.includes(loggedUser.uid))
        if (like && like.users && !like.users.includes(loggedUser.uid)){
            like.count++;
            like.users = [loggedUser.uid, ...like.users]
            console.log(like)
            await db.doc(`posts/${post.uid}`).update({like})
        }
    }

    const getDateStringFromDate = (dateObj) => {
        let dateArray = dateObj.toDate().toString().split(" ").slice(1, 5)
        let timeStamp = dateArray.pop().split(":")
        let meridian = "AM"
        // removing seconds
        timeStamp.pop()
        let hours = parseInt(timeStamp[0])
        if (hours > 12) {
            meridian = "PM"
            hours -= 12
        }
        timeStamp[0] = hours.toString();
        let [month, date, year] = dateArray
        return [date, month, year].join(" ") + " at " + timeStamp.join(":") + meridian
    }
    return (

        <Container className='my-container'>
            {posts.map(function (post) {
                return (
                    <Container className="post-container" key={post.id}>
                        <Row>
                            <Col md="auto"><img src={post.user && post.user.photoURL} className="post-img"
                                                alt="picture"/></Col>
                            <Col>
                                <Row><Col style={{
                                    'font-size': '25px',
                                    padding: '0',
                                    margin: '0',
                                    'font-weight': 'bold',
                                    'line-height': '30px',
                                    'margin-top': '1%',
                                    'margin-bottom': '3px'
                                }}>{post.user && post.user.displayName}</Col></Row>
                                <Row><Col style={{
                                    'line-height': '80%',
                                    padding: '0',
                                    'font-size': '12px',
                                    'display': 'flex',
                                    'align-items': 'center'
                                }}><AlarmIcon style={{
                                    'font-size': "12px",
                                    'margin-right': '2px'
                                }}/>{post && getDateStringFromDate(post.createdAt)}</Col></Row>
                            </Col>
                            {/*Delete post button access only to creator of the post*/}
                            <Col>{loggedUser.uid == post.user.uid &&
                            <CancelIcon className="float-right" style={{color: 'red', cursor: 'pointer'}}
                                        onClick={() => deletePost(post.id)}/>}</Col>
                        </Row>
                        <Row><Col style={{
                            'padding-top': '0.5rem',
                            'padding-bottom': '1rem'
                        }}>
                            <div>{post.body}</div>
                        </Col></Row>
                        <hr className="hr"/>
                        <Row>
                            <Col><Button variant="outline-secondary" size={"sm"}
                                         style={{'width': '100%'}} onClick={() => handleLike(post)}><ThumbUpIcon/> Like   {post.like && post.like.count}</Button></Col>
                            <Col><Button variant="outline-secondary" size={"sm"}
                                         style={{'width': '100%'}}><ChatIcon/> Comment</Button></Col>
                        </Row>
                        <hr className="hr"/>
                    </Container>
                )
            })}
        </Container>
    )
}

export default Post;