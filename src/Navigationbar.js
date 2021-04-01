import {Navbar, Nav, Button} from "react-bootstrap";

const Navigationbar = ({user}) => {
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#">Think Tank</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Item><img src={user.photoURL} alt="profile picture" className="nav-img"/></Nav.Item>
                    <Nav.Link href="#user" className="mr-2">{user.displayName}</Nav.Link>
                    <Nav.Item><Button variant="outline-info" className="ml-1 mr-1">Sign Out</Button></Nav.Item>
                </Nav>
            </Navbar>
        </>
    )
}

export default Navigationbar;