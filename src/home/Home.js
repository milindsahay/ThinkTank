import Navigationbar from "../Navigationbar";
import Userinfo from "./Userinfo";
import Post from "./Post";
import AddPost from "./addPost";
function Home({user, setUser, posts, setPosts}){

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