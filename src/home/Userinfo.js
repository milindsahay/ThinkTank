import {Col, Container, Row} from "react-bootstrap";
import "./Userinfo.css"
const Userinfo  = () => {
    return (
        <div>
            <Container className="my-container">
                <Row>
                    <Col xs={4}>
                        User Image
                    </Col>
                    <Col>
                        <div>
                            Name : xyz
                        </div>
                        <div>
                            email : dummy
                        </div>
                        <div>
                            joined : 222222
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Userinfo;