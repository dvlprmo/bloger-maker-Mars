
import React, { Component, useState, useEffect } from 'react'
import { Row, Form, Col, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import '../App.css';

const forget = {
    marginLeft: "110px"
  };
export default class Reset extends Component {

    state = {
        isSent: false
    };

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
    //http://localhost:5510/api/user/forget
  

    onSubmit = (e) => {
        e.preventDefault()
        Axios.post(`/api/user/reset/${this.props.match.params.token}`, { password: this.state.password })
            .then(res => {
                console.log(res)
                this.setState({
                    isSent: true,
                    message: res.data.message,
                    color: "success"
                })

            })
            .catch(err => console.log(err))
    }

    render() {
        console.log()
        return (
            <div>
                {this.state.isSent &&
                    <Alert variant={this.state.color}>
                        {this.state.message}
                    </Alert>
                }
                <Form >
                    <Row className="justify-content-center mt-5">
                        <Col md={{ span: 6, offset: 3 }}>


                            <Form.Row> <br /></Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md={6} controlId="formGridEmail" className="form-group required">
                                    <Form.Label className="control-label">New Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter New Password" name="password" onChange={(e) => this.changeHandler(e)} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row> <br /></Form.Row>
                            <Col md={{ span: 4, offset: 2 }} style={forget}>
                                <Button variant="btn btn-outline-dark" md={6} onClick={(e) => this.onSubmit(e)}>
                                   Change
                        </Button>
                            </Col>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
