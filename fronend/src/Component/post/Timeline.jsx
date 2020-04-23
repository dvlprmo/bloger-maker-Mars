import React, { Component } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import PostCard from './PostCard'
import axios from "axios"
import Circle from 'react-animation-h3ro-yasir'


export default class Timeline extends Component {

    state = {
        Timeline: [],
        loading: false,
        selectedPost: []
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/post/timeline')
            .then(res => {
                // console.log(res)
                this.setState({
                    Timeline: res.data,
                    selectedPost: res.data,

                })
                // console.log(res.data)
                setTimeout(() => {
                    this.setState({
                        loading: true
                    })
                }, 1000);
            }).catch(err => console.log(err))


        // console.log(this.state.Timeline)
    }

    filterPost = ({ target: { value } }) => {

        if (value == "All") {
            this.setState({
                selectedPost: this.state.Timeline
            })
        } else {
            this.setState({
                selectedPost: this.state.Timeline.filter(post => {

                    return post.typee == value
                }
                )
            })
        }
    }
    render() {
        // console.log(this.state.Timeline)

        let Timeline = this.state.selectedPost.map((post, i) => {

            return <PostCard key={i} post={post} _id={this.props.user._id}/>
        })
        let types = this.state.Timeline.map(post => post.typee)
        types.unshift("All")
        return (
            <div>

                <div>

                    <Container className="mt-5">
                        <Row className="mt-5 justify-content-center">
                            <Col md={4}>

                            </Col>
                        </Row>
                        <Row className="mt-5 justify-content-center" >

                            {this.state.loading ? Timeline : (<Circle />)}

                        </Row>

                    </Container>

                </div >

            </div >
        )
    }
}