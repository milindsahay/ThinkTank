import Navigationbar from "../Navigationbar";
import Userinfo from "./Userinfo";
import Post from "./Post";
function Home(){
    return(
        <div>
            <Navigationbar />
            <Userinfo/>
            <Post/>

        </div>
    )
}

export default Home