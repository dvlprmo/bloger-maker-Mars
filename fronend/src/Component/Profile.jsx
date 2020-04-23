// import React, { useState, useEffect } from "react";
import React, { Component } from 'react'
import { Row, Form, Col, Button, Alert, Image } from "react-bootstrap";
import Axios from "axios";
import { Link } from 'react-router-dom'
import "../App.css";


export default class Profile extends Component {
    render() {
        let user = this.props.user
// const Profile = () => {
//   const [user] = useState({}); // user info
 

//   let info = (e) => {
//     Axios.get("http://localhost:5100/api/profile", user)
//       .then((res) => {
//         console.log(res.data.user);
//       })
//       .catch((err) => console.log(err));
//   }

  return (
      <>
      <div className="justify-content-center text-center mt-5">
      <Image  className="rounded" src ={user.image}></Image>
      </div>
    <div className="card text-center mt-5">
      <div className="card-header">
      <h5>{user.firstname.toUpperCase()} {user.lastname.toUpperCase()}</h5>
      </div>
      <div className="card-body">
        <h5 className="card-title">Email : {user.email}</h5>
        <i className="fas fa-heart"></i>
        <Button className="justify-content-center text-center mt-5 card-text " as={Link} to="/ChangePasw" variant="btn btn-outline-dark" md={6} >
                                Change Password
                    </Button>
                    {"     "}
                    <Button className="justify-content-center text-center mt-5 card-text " as={Link} to="/Favorite" variant="btn btn-outline-dark" md={6} >
                    Favorite Post
                    </Button>
        
      </div>
   
    </div>
    
    </>
  );
};
}
// export default Profile;
