import {Router} from "@reach/router";
import Signup from "./Signup";
import Home from "./home/Home";
import {Provider} from "react-redux";
import {store} from "./redux_store";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Signup path="/" />
                <Home path="/home" />
            </Router>
        </Provider>
    );
}

export default App;
