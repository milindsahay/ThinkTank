import Navigationbar from "../Navigationbar";
import Posts from "./Posts";
import AddPost from "./addPost";
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