import {Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";

const Navigationbar = () => {
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Think Tank</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="#user"> image + user</Nav.Link>
                    <Nav.Item><Button variant="outline-info" className="ml-1 mr-1">Sign Out</Button></Nav.Item>
                </Nav>
            </Navbar>
        </>
    )
}

export default Navigationbar;