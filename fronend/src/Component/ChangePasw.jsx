import React, {Component, useState, useEffect } from 'react'
import { Row, Form, Col, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../App.css';

const forget = {
  marginLeft: "120px"
};
export default class Login extends Component {
  state = {};

  loginHandler = () => {
    //props from Login in App.js
    //this.state reps cred in App.js
    this.props.login(this.state);
  };

  changeHandler = (e) => {
    // console.log("name of field", e.target["name"]);
    // console.log("value of field", e.target.value);
    let temp = { ...this.state }; //copy state object
    temp[e.target.name] = e.target.value;
    this.setState(temp);
  };
  render() {
    return (
      <div>
            <Form >
                <Row className="justify-content-center mt-5">
                    <Col md={{ span: 6, offset: 3 }}>
                       
                        
                        <Form.Row> <br /></Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md={6} controlId="formGridpasword" className="form-group required">
                                <Form.Label className="control-label">Email</Form.Label>
                                <Form.Control type="pasword" placeholder="Enter pasword" name="pasword" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row> <br /></Form.Row>
                        <Col md={{ span: 4, offset: 2 }} style={forget}>
                            <Button as={Link} to="/Message"variant="btn btn-outline-dark" md={6}>
                                Change pasword
                    </Button>
                        </Col>
                    </Col>
                </Row>
            </Form>
        </div>
    );
  }
}
 