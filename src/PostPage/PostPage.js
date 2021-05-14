import Post from "../home/Post";
import {useEffect, useState} from "react";
import {db} from "../firebase";
import Navigationbar from "../Navigationbar";

// Separate comment and create user page instead
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
        </>
    )
}


export default PostPage;