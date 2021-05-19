import {Router} from "@reach/router";
import Signup from "./Signup";
import Home from "./home/Home";
import {Provider} from "react-redux";
import {store} from "./redux_store";
import User from "./user/User";
import {useEffect} from "react";
import {addNewUser, auth} from "./firebase";
import PostPage from "./PostPage/PostPage";
import Particles from "react-particles-js";
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
            <Particles style={{'position': 'fixed'}}
                params={{
                    "particles": {
                        "number": {
                            "value": 160,
                            "density": {
                                "enable": false
                            }
                        },
                        "size": {
                            "value": 3,
                            "random": true,
                            "anim": {
                                "speed": 4,
                                "size_min": 0.3
                            }
                        },
                        "line_linked": {
                            "enable": false
                        },
                        "move": {
                            "random": true,
                            "speed": 1,
                            "direction": "top",
                            "out_mode": "out"
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "bubble"
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        },
                        "modes": {
                            "bubble": {
                                "distance": 250,
                                "duration": 2,
                                "size": 0,
                                "opacity": 0
                            },
                            "repulse": {
                                "distance": 400,
                                "duration": 4
                            }
                        }
                    }
                }} />
            <Router>
                <Signup path="/" />
                <Home path="/home" />
                <User path="/user/:userid" />
                <PostPage path="/post/:postid"/>
            </Router>
        </Provider>
    );
}

export default App;
