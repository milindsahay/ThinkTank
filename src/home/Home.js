import Navigationbar from "../Navigationbar";
import Userinfo from "./Userinfo";
import Post from "./Post";
function Home({user, setUser}){
    return(
        <div>
            <Navigationbar user={user} setUser={setUser}/>
            <Userinfo user={user}/>
            <Post/>

        </div>
    )
}

export default Home