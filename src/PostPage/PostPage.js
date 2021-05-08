import Post from "../home/Post";
import {useEffect, useState} from "react";
import {db} from "../firebase";
import Navigationbar from "../Navigationbar";

const PostPage = (props) => {
    const [post, setPost] = useState();
    const getPostFromDB = async () => {
        const unsubscribe = await db.doc(`posts/${props.postid}`).onSnapshot((snapshot => {
            console.log("Subscribed to post page.....")
            setPost({id: snapshot.id, ...snapshot.data()});
        }))
        return unsubscribe;
    }
    useEffect(() => {
        const unsubscribe = getPostFromDB();
        return () => {
            unsubscribe.then(response => response())
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