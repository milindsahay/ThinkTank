import {Navbar, Nav, Button} from "react-bootstrap";
import {auth} from "./firebase";
import {Link, navigate} from "@reach/router";
import {store} from "./redux_store";
import {useSelector} from "react-redux";

const Navigationbar = () => {
    const user = useSelector(state => state.user)
    async function signOut(e){
        try{
            e.preventDefault();
            await auth.signOut();
            navigate('/')
        }
        catch (e) {
            alert(e.message)
            console.log(e)
        }
    }
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Link to='/home'><Navbar.Brand>Think Tank</Navbar.Brand></Link>
                <Nav className="ml-auto">
                    <Link to='/user' ><Nav.Item><img src={user.photoURL} alt="profile picture" className="nav-img"/></Nav.Item></Link>
                    <Nav.Item><Button variant="outline-info" className="ml-1 mr-1" onClick={signOut}>Sign Out</Button></Nav.Item>
                </Nav>
            </Navbar>
        </>
    )
}

export default Navigationbar;