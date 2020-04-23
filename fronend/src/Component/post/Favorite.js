import React, { Component } from 'react'
import FavCard from "../post/FavCard"
import axios from "axios"
import PostCard from './PostCard'
import { Col, Image, Button, Form, Container, Row } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import Circle from 'react-animation-h3ro-yasir'
import { BsFillHeartFill, BsFillTrashFill } from "react-icons/bs";

const forget = {
    fontSize: "25px"


};
const notForget = {
    marginLeft: "0",
    fontSize: "25px"
};
export default class Favorite extends Component {

    state = {
        favPost: [],
        loading: false,
        post :{}
        
    }
    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.put(`http://localhost:5000/api/user/favbooks/${this.props.match.params}`, {_id:this.props.user._id})
            .then(response => {
                console.log(response)
                this.setState({
                    
                    favPost: response.data.favoritePost
                })
                setTimeout(() => {
                    this.setState({
                        loading: true
                    })
                }, 1000);
            }).catch(err => console.log(err))
        
            

    }

    // filterPost = ({ target: { value } }) => {

    //     if (value == "All") {
    //         this.setState({
    //             favoritePost: this.state.favoritePost
    //         })
    //     } else {
    //         this.setState({
    //             selectedPost: this.state.Timeline.filter(post => {

    //                 return post.typee == value
    //             }
    //             )
    //         })
    //     }
    // }
    render() {
        console.log(this.state.favPost)
        let F  =this.state.favPost.map((e)=>{
            
            return {
                title: e.title,
                poster:e.poster,
                image:e.image,
                overview:e.overview,
                content:e.content,
                _id:e._id

                
                
        }
        })

        const Fave = F.map((post, i) => {
            return <FavCard key={i} post={post} _id={F._id}/>
        })
        console.log(F)
       
             
    
        // let types = this.state.favoritePost.map(post => post.typee)
        // types.unshift("All")
        return (
            <div>

                <div>

                    <Container className="mt-5">
                        <Row className="mt-5 justify-content-center">
                            <Col md={4}>

                            </Col>
                        </Row>
                        <Row className="mt-5 justify-content-center" >

                            {this.state.loading ? Fave : (<Circle />)}

                        </Row>

                    </Container>

                </div >

            </div >
         )
        
    }   
}