import {Button, Col, Container, Row} from "react-bootstrap";
import AlarmIcon from "@material-ui/icons/Alarm";
import CancelIcon from "@material-ui/icons/Cancel";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatIcon from "@material-ui/icons/Chat";
import {db} from "../firebase";
import {useSelector} from "react-redux";
import {Link} from "@reach/router";
import {useEffect, useState} from "react";

const Post = (props) => {
    const [commentCount, setCommentCount] = useState(0);

    const loggedUser = useSelector(state => state.user)
    const deletePost = async (id) => {
        try {
            await db.doc(`posts/${id}`).delete();
        } catch (e) {
            alert(e.message);
            console.log(`error while deleting document ${e}`)
        }
    }

    const handleLike = async (post) => {
        if (!post.id) return;
        const {like} = post
        console.log("inside handle like")
        //If user has already liked the post, don't let him/her like it again
        if (like?.users && !like.users.includes(loggedUser.uid)) {
            like.count++;
            like.users = [loggedUser.uid, ...like.users]
            await db.doc(`posts/${post.id}`).update({like})
        } else if (like?.users && like.users.includes(loggedUser.uid)) {
            like.count--;
            like.users = like.users.filter(function (uid) {
                return uid !== loggedUser.uid
            })
            await db.doc(`posts/${post.id}`).update({like})
        }
    }
    const getLikeButtonColor = (post) => {
        const {like} = post
        return like?.users && !like.users.includes(loggedUser.uid) ? '#6c757d' : '#007bff'
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

    const getCommentCount = (postID) => {
        if (!postID) return;
        db.collection(`posts/${postID}/comments`).get().then(snapshot => {
            if (snapshot.empty) setCommentCount(0);
            setCommentCount(snapshot.docs.length)
        });
    }

    useEffect(() => {
        getCommentCount(props.post.id);
    }, [])

    return (
        <Container className="post-container" key={props.post.id}>
            <Row>
                <Col md="auto"><img src={props.post.user && props.post.user.photoURL} className="post-img"
                                    alt="picture"/></Col>
                <Col>
                    <Row> <Link to={`/post/${props.post.id}`}><Col style={{
                        'font-size': '25px',
                        padding: '0',
                        margin: '0',
                        'font-weight': 'bold',
                        'line-height': '30px',
                        'margin-top': '1%',
                        'margin-bottom': '3px'
                    }}>{props.post.user && props.post.user.displayName}</Col></Link></Row>
                    <Row><Col style={{
                        'line-height': '80%',
                        padding: '0',
                        'font-size': '12px',
                        'display': 'flex',
                        'align-items': 'center'
                    }}><AlarmIcon style={{
                        'font-size': "12px",
                        'margin-right': '2px'
                    }}/>{props.post && getDateStringFromDate(props.post.createdAt)}</Col></Row>
                </Col>
                {/*Delete post button access only to creator of the post*/}
                <Col>{loggedUser.uid === props.post.user.uid &&
                <CancelIcon className="float-right" style={{color: 'red', cursor: 'pointer'}}
                            onClick={() => deletePost(props.post.id)}/>}</Col>
            </Row>
            <Row><Col style={{
                'padding-top': '0.5rem',
                'padding-bottom': '1rem'
            }}>
                <div>{props.post.body}</div>
            </Col></Row>
            <hr className="hr"/>
            <Row>
                <Col><Button variant="outline-secondary" size={"sm"}
                             style={{'width': '100%', 'color': getLikeButtonColor(props.post)}}
                             onClick={() => handleLike(props.post)}><ThumbUpIcon/> Like {props.post.like && props.post.like.count}
                </Button></Col>
                <Col><Button variant="outline-secondary" size={"sm"}
                             style={{'width': '100%'}}><ChatIcon/> Comment {commentCount} </Button></Col>
            </Row>
            <hr className="hr"/>
        </Container>
    )
}


export default Post;