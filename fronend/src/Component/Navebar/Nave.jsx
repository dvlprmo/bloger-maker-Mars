import React, { Component } from 'react'
import { Navbar, Nav, Button, Form } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import Logo from '../marsLogo.png'
import { BsFillHeartFill, BsFillForwardFill } from "react-icons/bs";

const divStyle = {
    opacity: 0.6
};
const textStyle = {
    fontWeight: 'bolder'

};
const notForget = {
    color: "white",
    margin: "20px",
    fontSize:"25px"

};
class Nave extends Component {
    render() {
        return (
            <div>

                <Navbar variant="dark">

                </Navbar>

                <Navbar bg="dark" variant="dark" >
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src={Logo}
                            width="90px"
                            height="90px"
                            style={divStyle}
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                    <Nav style={textStyle} className="mr-auto" variant="tabs"  >
                        <Nav.Link as={Link} to="/Home">Home</Nav.Link>

                        <Nav.Link as={Link} to="/Profile">Profile</Nav.Link>
                        <Nav.Link as={Link} to="/Timeline">Timeline</Nav.Link>


                        <Nav.Link as={Link} to="/About">Developers</Nav.Link>
                        <Nav.Link as={Link} to="/CreatePost">Add Post</Nav.Link>

                    </Nav>

                    <Nav>
                        <div>
                            {!this.props.isLogin ?
                                <> <Button as={Link} to="/Login" variant="outline-light" >  Sign In  </Button>
                                    <Button as={Link} to="/Register" variant="outline-light" className="ml-3"> Register</Button> </>
                                :
                                <Form>
                                    <Button variant="outline-light" className="ml-3" onClick={() => { localStorage.removeItem("token"); this.props.userLogin(); this.props.history.push('/Login') }}> Logout</Button>
                                    <Button style={notForget} as={Link} to="/Favorite" variant="btn-outline-dark" md={6}>
                                        <p><BsFillHeartFill /></p>
                                    </Button>
                                </Form>
                            }

                        </div>
                    </Nav>
                </Navbar>

            </div>
        )
    }
}

export default withRouter(Nave)