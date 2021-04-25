import {Router} from "@reach/router";
import Signup from "./Signup";
import Home from "./home/Home";
import {Provider} from "react-redux";
import {store} from "./redux_store";
import User from "./user/User";
import {useEffect} from "react";
import {addNewUser, auth} from "./firebase";

function App() {
    useEffect(() => {
        auth.onAuthStateChanged(async (authUser)=>{
            if(authUser) {
                const dbUser = await addNewUser(authUser)
                store.dispatch({type:'user/set', user:dbUser})
            }
        })
    },[])
    return (
        <Provider store={store}>
            <Router>
                <Signup path="/" />
                <Home path="/home" />
                <User path="/user" />
            </Router>
        </Provider>
    );
}

export default App;
