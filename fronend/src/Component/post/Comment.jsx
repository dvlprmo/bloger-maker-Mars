import React, { Component } from "react";
import Axios from "axios";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const forget = {
  marginLeft: "130px"
};
const Paragraph = styled.p`
  font-size: 15px;
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  border: rgb(48, 48, 48);
  color: rgb(255, 255, 255);
  background-color: rgb(48, 48, 48);
  border-radius: 8px;
  padding: 8px;
`;


export default class Comment extends Component {
  state = {
    post: {},
  };

  componentDidMount() {
    console.log(`${this.props.match.params.id}`)
    Axios.get(`http://localhost:5000/api/post/comment/${this.props.match.params.id}`)
      .then(
        (res) => {
          this.setState({
            post: res.data.post,
          })
          console.log(res);
        }
        // this.setState({
        //   movie: res.data.filter(
        //     (movie) => movie._id === this.props.match.params.id
        //   )[0],
        // })
      )
      .catch((err) => {
        console.log(err);
      });




    Axios.get(`http://localhost:5000/api/user/${this.props.match.params.id}`)
      .then(
        (res) => {
          this.setState({
            user: res.data.user,
          })
          console.log(res);
        }
      )
      .catch((err) => {
        console.log(err);
      });


  }


  render() {
    console.log(this.state.post);
    return (
      <div>

        <Container>
          <Row className="mt-5">
            <Col md={5} className="mr-5">
              <Image style={{ height: 400, width: 450 }} src={`http://localhost:5000/${this.state.post.image}`} />
            </Col>
            <Col md={5}>
              {/* <h4>{this.state.post.title}</h4>
              <h4>{this.state.post.poster}</h4>
              <h4>{this.state.post.overview}</h4> */}
              <Paragraph>{this.state.post.content}</Paragraph>
            </Col>
            <Button as={Link} to="/Timeline" variant="outline-light" >  Back  </Button>
          </Row>
          <Row className="justify-content-center mt-5">
            <Col md={{ span: 2, offset: 2 }} style={forget}>
              <Button as={Link} to="/Timeline" variant="btn btn-outline-dark" md={6}>
                Back Home
                    </Button>
            </Col>
          </Row>

        </Container>

      </div>
    );
  }
}
