import {Router} from "@reach/router";
import Signup from "./Signup";
import Home from "./home/Home";
import {useState} from "react";

function App() {
    const [user, setUser] = useState({displayName:"Default", photoURL:"default", email:"default"})
    const [posts, setPosts] = useState([])
    return (
        <Router>
            <Signup path="/" user={user} setUser={setUser}/>
            <Home path="/home" user={user} setUser={setUser} posts={posts} setPosts={setPosts}/>
        </Router>
    );
}

export default App;
