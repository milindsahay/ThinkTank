import Navigationbar from "../Navigationbar";
import Userinfo from "./Userinfo";
import Post from "./Post";
import AddPost from "./addPost";
function Home({user, setUser}){

    return(
        <div>
            <Navigationbar user={user} setUser={setUser}/>
            <Userinfo user={user}/>
            <AddPost user={user}/>
            <Post/>
        </div>
    )
}

export default Home