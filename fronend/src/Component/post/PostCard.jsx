import React, { Component } from 'react'
import Comment from './Comment'
import { Col, Image, Button, Form } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { BsFillHeartFill, BsFillTrashFill , BsChatSquareDotsFill} from "react-icons/bs";


import Axios from 'axios'
const forget = {
    fontSize: "25px"


};
const notForget = {
    marginLeft: "0",
    fontSize: "25px"
};

const Paragraph = styled.p`
  font-size: 20px;
  text-align: center;
font-family: Verdana, Geneva, Tahoma, sans-serif;
  border: rgb(48, 48, 48);
  color: rgb(255, 255, 255);
  background-color: rgb(48, 48, 48);
  border-radius: 8px;
  padding: 8px;
`;

const Header = styled.h5`
  font-size: 20px;
  text-align: center;
font-family: Verdana, Geneva, Tahoma, sans-serif;
  border: rgb(48, 48, 48);
  color: black;
  background-color: rgba(71, 70, 70, 0.178);
  border-radius: 8px;
  padding: 12px;
`;

class PostCard extends Component {


    onSubmit = (e) => {
        e.preventDefault()
        Axios.post(`http://localhost:5000/api/user/favbooks/${this.props.post._id}`, {_id:this.props._id})
                     .then(response => {
                console.log(response)
                this.setState({
                    favPost: response,
                })
                setTimeout(() => {
                    this.setState({
                        loading: true
                    })
                }, 1000);
            }).catch(err => console.log(err))
        }

    DeletePost = () => {
        Axios.delete(`http://localhost:5000/api/post/delete/${this.props.post._id}`)
            .then(res => {
                console.log(res)
            })

    }


    render() {
        console.log(this.props.post._id + " hhhh")
        console.log(this.props._id)
        // let {firstname, lastname} = this.props.user
        
        let { title, poster, image, overview, content, _id } = this.props.post
        console.log(_id)
        return (
            <Col md={5} className="m-2 bg-rgba(71, 70, 70, 0.178)" style={{ borderStyle: "double", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Image className="mt-3"  style={{ height: 190, width: 250 }} src={`http://localhost:5000/${image}`} ></Image>
                {/* <h5>{firstname} {lastname}</h5> */}

                <Paragraph className="mt-4" >{title}</Paragraph>
                <h5>{poster}</h5>
                <Header>{overview}</Header>
                {/* <h5>{content}</h5> */}

                <Form >
                    <Button style={notForget} onClick ={this.onSubmit} variant="btn-outline-dark" md={6} 
                    //  render={() => <Favorite postid={this._id} />}
                    postid={_id}
                    >
                        <p><BsFillHeartFill /></p>
                    </Button>
                    <Button style={forget} as={Link} to={`/Comment/${_id}`} variant="btn-outline-dark" md={6}
                    >
                        <p><BsChatSquareDotsFill /></p>
                    </Button>
                    <Button as={Link} to={'/Home'} style={notForget} variant="btn-outline-dark" md={6} onClick={() => this.DeletePost()}>
                        <p><BsFillTrashFill /></p>
                    </Button>

                </Form>



            </Col>
        )
    }

}

export default withRouter(PostCard);