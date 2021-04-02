import {Navbar, Nav, Button} from "react-bootstrap";
import {auth} from "./firebase";
import {navigate} from "@reach/router";

const Navigationbar = ({user}) => {
    async function signOut(e){
        try{
            e.preventDefault();
            const user = await auth.signOut();
            console.log(user)
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
                <Navbar.Brand href="#">Think Tank</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Item><img src={user.photoURL} alt="profile picture" className="nav-img"/></Nav.Item>
                    <Nav.Link href="#user" className="mr-2">{user.displayName}</Nav.Link>
                    <Nav.Item><Button variant="outline-info" className="ml-1 mr-1" onClick={signOut}>Sign Out</Button></Nav.Item>
                </Nav>
            </Navbar>
        </>
    )
}

export default Navigationbar;