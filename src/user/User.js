import {Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import Navigationbar from "../Navigationbar";

const User = () => {
    const user = useSelector(state => state.user)
    return (
        <>
            <Navigationbar/>
            <div>
                <Container className="my-container p-3">
                    <Row>
                        <Col xs={4}>
                            <img src={user.photoURL}/>
                        </Col>
                        <Col>
                            <div>
                                Name : {user.displayName}
                            </div>
                            <div>
                                Email : {user.email}
                            </div>
                            <div>
                                Last Login : {new Date().toString()}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>

    )
}

export default User;