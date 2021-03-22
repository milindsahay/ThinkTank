import {Router} from "@reach/router";
import Signup from "./Signup";
import Home from "./home/Home";
import {useState} from "react";

function App() {
    let [user, setUser] = useState(null)
    return (
        <Router>
            <Signup path="/" />
            <Home path="/home"/>
        </Router>
    );
}

export default App;
