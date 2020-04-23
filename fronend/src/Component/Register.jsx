import React, { useState, useEffect } from 'react'
import { Row, Form, Col, Button, Alert } from 'react-bootstrap'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import '../App.css';
// import Axios from 'axios'

const divStyle = {
    marginLeft: '80px',

  };
const Register = (props) => {
    const [user, setUser] = useState({})// user info
    const [register, setRegister] = useState(false) // to show aleart

    //to add the input inside user
    let onChangeInput = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }
    // to add the user info to database
    let onSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:5000/api/user/register', user)
            .then(res => {


                console.log(res.data + "res data")
                console.log(res.data._id + "res data vregister")
                if (res.data != undefined) {
                    console.log("Something")
                    props.history.push('/Login')
                } else {
                    setRegister(true)
                    setTimeout(() => {
                        setRegister(false)
                    }, 1000);
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <Form >
                <Row className="justify-content-center mt-5">
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Row>
                            <Col className="form-group required " md={6}>
                                <Form.Label className="control-label">First Name</Form.Label>
                                <Form.Control placeholder="First name" name="firstname" onChange={(e) => onChangeInput(e)} />
                            </Col>
                        </Form.Row>
                        <Form.Row><br /></Form.Row>
                        <Form.Row>
                            <Col className="form-group required" md={6}>
                                <Form.Label className="control-label">Last Name</Form.Label>
                                <Form.Control placeholder="Last name" name="lastname" onChange={(e) => onChangeInput(e)} />
                            </Col>

                        </Form.Row>
                        <Form.Row> <br /></Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md={6} controlId="formGridEmail" className="form-group required">
                                <Form.Label className="control-label">Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => onChangeInput(e)} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md={6} controlId="formGridPassword" className="form-group required">
                                <Form.Label className="control-label">Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => onChangeInput(e)} />
                            </Form.Group>
                        </Form.Row>
                        <Col md={{ span: 8, offset: 2 }} >
                            <Button variant="btn btn-outline-dark" md={6} onClick={(e) => onSubmit(e)}>
                                Register
                    </Button>
                        </Col>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Register;