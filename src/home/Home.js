import Navigationbar from "../Navigationbar";
import Posts from "./Posts";
import AddPost from "./addPost";
import {useEffect} from "react";
import {addNewUser, auth, getUser} from "../firebase";
import {store} from "../redux_store";
//user profile addition
import "./Home.css"

function Home(){

    return(
        <div>
            <Navigationbar />
            <AddPost />
            <Posts />
        </div>
    )
}

export default Home