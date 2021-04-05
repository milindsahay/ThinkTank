import Navigationbar from "../Navigationbar";
import Userinfo from "./Userinfo";
import Post from "./Post";
import AddPost from "./addPost";
import {useEffect} from "react";
import {addNewUser, auth, getUser} from "../firebase";
function Home({user, setUser, posts, setPosts}){
useEffect(() => {
 auth.onAuthStateChanged(async (authUser)=>{
     if(authUser) {
         const dbUser = await addNewUser(authUser)
         setUser(dbUser);
     }
 })
},[])
    return(
        <div>
            <Navigationbar user={user} setUser={setUser}/>
            <Userinfo user={user}/>
            <AddPost user={user} posts={posts} setPosts={setPosts}/>
            <Post posts={posts} setPosts={setPosts}/>
        </div>
    )
}

export default Home