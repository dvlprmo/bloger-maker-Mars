import React, { Component } from 'react'
import Favorite from "../post/Favorite"
import { Col, Image, Button, Form } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { BsFillHeartFill, BsFillTrashFill } from "react-icons/bs";
import Axios from 'axios'
const forget = {
    fontSize: "25px"


};
const notForget = {
    marginLeft: "0",
    fontSize: "25px"
};
class FavCard extends Component {

    state = {};
    ///favbook/:id/delete

    onSubmit = (e) => {
        }
        onDelete = () => {
            console.log(this.props.post._id)
            Axios.delete(`http://localhost:5000/api/user/delete/${this.props.post._id}`)
            .then(res => {
                console.log(res)
            })

    
        }
        
        
    render() {
        // let {firstname, lastname} = this.props.user
        console.log(this.props.post)
        let { title, poster, image, overview, content, _id } = this.props.post


        return (
            <Col md={5} className="m-2" style={{ borderStyle: "double", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Image roundedCircle style={{ height: 150, width: 250 }} src={`http://localhost:5000/${image}`} ></Image>
                {/* <h5>{firstname} {lastname}</h5> */}
                <p>{title}</p>
                <h5>{poster}</h5>
                <h5>{overview}</h5>
                <h5>{content}</h5>
               
                <Form >
                    <Button style={notForget} onClick ={this.onSubmit} variant="btn-outline-dark" md={6} 
                    //  render={() => <Favorite postid={this._id} />}
                    >
                        <p><BsFillHeartFill /></p>
                    </Button>
                    <Button style={forget} onClick ={this.onDelete} variant="btn-outline-dark" md={6}>
                        <p><BsFillTrashFill /></p>
                    </Button>

                </Form>



            </Col>
        )
    }
}

export default withRouter(FavCard);