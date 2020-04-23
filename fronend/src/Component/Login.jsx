import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row, Container } from 'react-bootstrap'
import Axios from 'axios'
import { Link } from 'react-router-dom'

const forget = {
    marginLeft: "80px"
};
export const Login = (props) => {
    const [login, setLogin] = useState({})


    let onChangeInput = ({ target: { name, value } }) => {
        setLogin({ ...login, [name]: value })
    }
    useEffect(() => {
        console.log(login) // print whats in the input
    })

    let onSubmit = (e) => {
        e.preventDefault()
        Axios.post('/api/user/login', login)
            .then(res => {
                console.log(res.data)
                console.log(res.data.token )
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token)
                    props.userLogin()
                    props.history.push('/home')
                } else {

                    console.log("email or password not correct")
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <Form >
                <Row className="justify-content-center mt-5">
                    <Col md={{ span: 6, offset: 3 }}>


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
                        <Col md={{ span: 2, offset: 2 }}>
                            <Button variant="btn btn-outline-dark" md={6} onClick={(e) => onSubmit(e)}>
                                Sign In
                    </Button>
                        </Col>
                        <Form.Row> <br /></Form.Row>
                        <Col md={{ span: 4, offset: 2 }} style={forget}>
                            <Button as={Link} to="/Forget" variant="btn btn-outline-dark" md={6}>
                                Forget Password?
                    </Button>
                        </Col>
                    </Col>
                </Row>
            </Form>


        </>
    )
}