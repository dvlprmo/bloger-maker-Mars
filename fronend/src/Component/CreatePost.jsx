import React, { Component } from 'react'
import { Row, Form, Col, Button, Alert } from 'react-bootstrap'
import Axios from 'axios'
import '../App.css';

import { Link } from 'react-router-dom';
//import Axios from 'axios'

export default class CreatePost extends Component {



    state = {
        title: '',
        poster: '',
        image: '',
        overview: '',
        content: ''
    }
    onFileChange = (e) => {
        this.setState({

            image: e.target.files[0]
        })
    }
    onCallChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value })

    }

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', this.state.image)
        formData.append('post', JSON.stringify(this.state))
        Axios.post("http://localhost:5000/api/post/user-profile", formData, {
            post: JSON.stringify(this.state)
        
        }).then(res => {
            console.log(res)
        })
    }


    render() {
        return (
            <div>
                <Form >
                    <Row className="justify-content-center mt-5">
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form.Row>
                                <Col className="form-group required " md={6}>
                                    <Form.Label className="control-label">Title</Form.Label>
                                    <Form.Control placeholder="Title" name="title" onChange={this.onCallChange} />
                                </Col>
                            </Form.Row>
                            {/* <Form.Row><br /></Form.Row> */}
                            <Form.Row>
                                <Col className="form-group required " md={6}>
                                    <Form.Label className="control-label">Poster</Form.Label>
                                    <Form.Control placeholder="Poster" name="poster" onChange={this.onCallChange} />
                                </Col>

                            </Form.Row>
                            {/* <Form.Row><br /></Form.Row> */}
                            <Form.Row>
                                <Col className="form-group required " md={6}>
                                    <Form.Label className="control-label">Image</Form.Label>
                                    <Form.Control id="fileInput" type="file" placeholder="image" name="image" onChange={this.onFileChange} />
                                </Col>

                            </Form.Row>
                            {/* <Form.Row> <br /></Form.Row> */}
                            <Form.Row>
                                <Form.Group as={Col} className="form-group required " md={6} >
                                    <Form.Label className="control-label">Overview</Form.Label>
                                    <Form.Control placeholder="Overview" name="overview" onChange={this.onCallChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} className="form-group required " md={6} >
                                    <Form.Label className="control-label">Content</Form.Label>
                                    <textarea className="form-control" rows="5" placeholder="content" name="content"
                                        onChange={this.onCallChange}></textarea>

                                </Form.Group>
                            </Form.Row>
                            <Col md={{ span: 8, offset: 2 }}>
                                <Button as={Link} to="/Timeline" variant="btn btn-outline-dark" md={6} onClick={(e) => this.onSubmit(e)}>
                                    Post
                    </Button>
                            </Col>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}



