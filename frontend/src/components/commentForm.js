import React from 'react';
import { Container, Row, Col, Form, FloatingLabel} from 'react-bootstrap';
import Button from '@material-ui/core/Button';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content : ''
        };
      }
    
    handleContent = () => {

    }

    handleSubmit = () => {

    }

    render(){
        return(
        <Container className="my-2">
            <Row>
                <Col xs={12} md={9} align="center">
                    <Form.Group>
                        <FloatingLabel label="Votre message :">
                            <Form.Control
                                as="textarea"
                                style={{ height: '80px' }}
                                name="content" id="content" 
                                value={this.state.content} 
                                onChange={this.handleContent}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Col>

                <Col xs={12} md={3} align="center" className="mt-3">
                    <Button size="large" variant="contained" color="secondary" onClick={this.handleSubmit}>
                        Commenter
                    </Button>
                </Col>
            </Row>
        </Container>
        )
    } 

    
}

export default CommentForm