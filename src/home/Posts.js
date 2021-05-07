import {Container} from "react-bootstrap";
import {useEffect} from "react";
import {db} from "../firebase";
import {store} from "../redux_store";
import {useSelector} from "react-redux";
import Post from "./Post";

const Posts = () => {
    const posts = useSelector(state => state.posts)
    async function documents() {
        // firestore is returning a promise to unsubscribe to snapshot listener
        const unsubscribe = await db.collection('posts').onSnapshot(snapshot => {
            let myposts = [];
            console.log("Listening to updates on posts collection.....")
            snapshot.docs.map(doc => myposts.push({id: doc.id, ...doc.data()}))
            store.dispatch({type: 'posts/set', posts: myposts})
        })
        return unsubscribe;
    }
    useEffect(() => {
        const unsubscribe = documents();
        // cleanup fn to unsubscribe listeners on posts
        return () => unsubscribe.then(response => {
            response()
        });
    }, [])


    return (

        <Container className='my-container'>
            {posts.map(function (post) {
                return (
                    <Post post={post} key={post.id}/>
                )
            })}
        </Container>
    )
}

export default Posts;