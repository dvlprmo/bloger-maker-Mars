import React, { Component } from 'react'
import { Navbar, Nav, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../App.css';

var sectionStyle = {
    width: "100%",
    height: "655px",

};
export default class Home extends Component {
    render() {
        return (
            <div className="landing">
                <section style={sectionStyle}>
                    <div>
                        <h1>POST & TEACH</h1>
                        <h3>Simple Solutions for Complex Connections.</h3>
                    </div>
                    <div className="startPosting">
                            <Button as={Link} to="/Login" variant="outline-dark" className="ml-3 big"> Start Posting</Button>
                        </div>
                </section>

            </div>
        )
    }
}