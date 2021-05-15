import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {db} from "../firebase";
import {Col, Form, Row} from "react-bootstrap";

const Comments = (props) => {
    const user = useSelector(state => state.user)
    let unsubscribe = null
    const [comment, setComment] = useState("")
    const [allComments, setAllComments] = useState([]);
    const addComment = async (event) => {
        if (event.key === "Enter")
        {
            event.preventDefault();
            const ref = await db.doc(`posts/${props.post.id}`).collection("comments").add({content: comment, user: user})
            console.log(`Comment written with ref ${ref.id}`);
        }

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
                <Row style={{'margin-bottom': '0.5rem'}}>
                    <Col md={"auto"}><img src={user.photoURL} className="post-img" style={{'height': '30px'}}/></Col>
                    <Col style={{'align-self': 'center'}}>
                        <Row>
                            <Col>
                            <Form.Control type="text" placeholder={`Comment`} style={{'height': '30px'}}
                                                                              onChange={event => console.log("onchange" + event.target.value)} onKeyPress={(event)=>addComment(event)} />

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>

            {allComments.map(comment => (

                <Row key={comment.id}>
                    <Col md="auto"><img src={comment.user.photoURL} className="post-img"
                                        alt="picture" style={{
                        'height': '30px',
                        'margin-bottom': '3px'
                    }}/></Col>
                    <Col md={"auto"} style={{
                        padding: '8px',
                        'border-radius': '0.75rem',
                        'background-color': '#ebf0ec',
                        'margin': '0.5rem',
                        'margin-top': '0',
                        'padding-top': '0'
                    }}>
                        <Row> <Col md={"auto"} style={{
                            margin: '0',
                            'font-weight': 'bold',
                            'font-size': '16px'
                        }}>{comment.user && comment.user.displayName}</Col></Row>
                        <Row><Col md={"auto"} style={{
                            'line-height': '60%',
                            'font-size': '14px',
                            'display': 'flex',
                            'align-items': 'center'
                        }}>{comment.content}</Col></Row>
                    </Col>
                </Row>
            ))}
        </>
    )
}

export default Comments;