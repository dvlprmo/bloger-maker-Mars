import React from 'react'
import { Row, Form, Col, Button, Alert, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Mohammad from './mohamad.png'
import Malak from './malak.png'
import Jawaher from './jawaher.png'
import Rawan from './Rawan.png'
import '../App.css';

const forget = {
    marginLeft: "380px"
};
const display = {
    marginLeft: "70px",
    marginTop: "10px"
}

export default function About() {


    let onMohammad = () => {
        return window.location.href = 'https://www.linkedin.com/in/mohammad-aljagthmi-905323149/';
    }
    let onMalak = () => {
        return window.location.href = 'https://www.linkedin.com/in/malak-balkhair/';
    }
    let onJawaher = () => {
        return window.location.href = 'https://www.linkedin.com/in/jawaher-almaasrani-60b298172/';
    }
    let onRawan = () => {
        return window.location.href = 'https://www.linkedin.com/in/rawan-al-jehani-780a49180/';
    }


    return (

        <div>
        
            <Form className="mt-5 something">
                <Row className="mt- justify-content-center">
                    <Col>
                        <Image style={{ height: 300, width: 250 }} src={Mohammad} ></Image>
                        <Button style={display} variant="btn btn-outline-dark" md={6} onClick={onMohammad}>
                            View Profile
                    </Button>
                    </Col>
                    <Col>
                        <Image style={{ height: 300, width: 250 }} src={Malak} ></Image>
                        <Button style={display} variant="btn btn-outline-dark" md={6} onClick={onMalak}>
                            View Profile
                    </Button>

                    </Col>
                    <Col>
                        <Image style={{ height: 300, width: 250 }} src={Jawaher} ></Image>
                        <Button style={display} variant="btn btn-outline-dark" md={6} onClick={onJawaher}>
                            View Profile
                    </Button>

                    </Col>
                    <Col>
                    <Image style={{ height: 300, width: 250 }} src={Rawan} ></Image>
                        <Button style={display} variant="btn btn-outline-dark" md={6} onClick={onJawaher}>
                            View Profile
                    </Button>
                    </Col>


                </Row>
            </Form>


            <Form>
                <Row className="justify-content-center mt-5">
                    <Col md={{ span: 4, offset: 2 }} style={forget}>
                        <Button as={Link} to="/Home" variant="btn btn-outline-dark" md={6}>
                            Back Home
                    </Button>
                    </Col>
                </Row>
            </Form>


        </div >
    )
}

