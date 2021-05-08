import {Router} from "@reach/router";
import Signup from "./Signup";
import Home from "./home/Home";
import {Provider} from "react-redux";
import {store} from "./redux_store";
import User from "./user/User";
import {useEffect} from "react";
import {addNewUser, auth} from "./firebase";
import PostPage from "./PostPage/PostPage";
function App() {
    useEffect(() => {
        auth.onAuthStateChanged(async (authUser)=>{
            if(authUser) {
                const dbRef = await addNewUser(authUser)
                dbRef.onSnapshot(snapshot => {
                    var payload =  { uid: snapshot.id, ...snapshot.data()}
                    store.dispatch({type:'user/set', user:payload})
                })
            }
        })
    },[])
    return (
        <Provider store={store}>
            <Router>
                <Signup path="/" />
                <Home path="/home" />
                <User path="/user" />
                <PostPage path="/post/:postid"/>
            </Router>
        </Provider>
    );
}

export default App;
