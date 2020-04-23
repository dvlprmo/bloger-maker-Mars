
import React, { Component, useState, useEffect } from 'react'
import { Row, Form, Col, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import '../App.css';


const forget = {
  marginLeft: "100px"
};
export default class Login extends Component {
  state = {
    isSent: false
  };

  loginHandler = () => {
    //props from Login in App.js
    //this.state reps cred in App.js
    this.props.login(this.state);
  };
  componentDidMount(){
    console.log(window.location.host)
    this.setState({
        host: window.location.host
    })
}

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
    Axios.post('http://localhost:5000/api/user/forget', {email: this.state.email, host: this.state.host})
      .then(res => {
        console.log(res)
        if (res.status == 200) {
          this.setState({
            isSent:true,
            message: res.data.message,
            color: "success"
          })

        } else {
          this.setState({
            isSent:true,
            message: res.data.message,
            color: "danger"
          })

        }

      })
      .catch(err => console.log(err))
  }
  render() {
    console.log(this.props.match)
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
                  <Form.Label className="control-label">Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => this.changeHandler(e)} />
                </Form.Group>
              </Form.Row>
              <Form.Row> <br /></Form.Row>
              <Col md={{ span: 4, offset: 2 }} style={forget}>
                <Button variant="btn btn-outline-dark" md={6} onClick={(e) => this.onSubmit(e)}>
                  Send Link
                    </Button>
              </Col>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
