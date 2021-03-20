import {Router} from "@reach/router";
import Signup from "./Signup";
function App() {
    return (
        <Router>
            <Signup path="/" />
            {/*<Home path="/home"/>*/}
        </Router>
    );
}

export default App;
