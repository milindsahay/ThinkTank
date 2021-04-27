import Navigationbar from "../Navigationbar";
import Post from "./Post";
import AddPost from "./addPost";
import "./Home.css"


function Home(){

    return(
        <div>
            <Navigationbar />
            <AddPost />
            <Post />
        </div>
    )
}

export default Home