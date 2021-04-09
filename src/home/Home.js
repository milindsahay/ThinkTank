import Navigationbar from "../Navigationbar";
import Userinfo from "./Userinfo";
import Post from "./Post";
import AddPost from "./addPost";
import {useEffect} from "react";
import {addNewUser, auth, getUser} from "../firebase";
import {store} from "../redux_store";
//user profile addition
function Home(){

useEffect(() => {
 auth.onAuthStateChanged(async (authUser)=>{
     if(authUser) {
         const dbUser = await addNewUser(authUser)
         store.dispatch({type:'user/set', user:dbUser})
     }
 })
},[])
    return(
        <div>
            <Navigationbar />
            <Userinfo />
            <AddPost />
            <Post />
        </div>
    )
}

export default Home