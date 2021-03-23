import {Button, Col, Container, Row} from "react-bootstrap";

const Post = () => {
    return (
        <Container className='my-container'>
            <Container className="my-container">
                <Row><Col><strong>Title</strong></Col></Row>
                <Row><Col><div>body</div></Col></Row>
                <Row className="bottom-bar">
                    <Col className="pt-2">Posted by dummy</Col>
                    <Col  className="p-2">Time 2222222</Col>
                    <Col className="p-2"><Button variant="danger">Delete</Button></Col>
                </Row>
            </Container>

            <Container className="my-container">
                <strong>Title</strong>
                <div>body</div>
                <Row className="bottom-bar">
                    <Col className="pt-2">Posted by dummy</Col>
                    <Col  className="p-2">Time 2222222</Col>
                    <Col className="p-2"><Button variant="danger">Delete</Button></Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Post;