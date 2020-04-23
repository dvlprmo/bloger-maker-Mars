import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nave from './Component/Navebar/Nave';
import Home from './Component/Home';
import Register from './Component/Register';
import CreatePost from './Component/CreatePost';
import Timeline from './Component/post/Timeline';

import Forget from './Component/Forget'
import Message from './Component/Message'
import About from './Component/About'
import Favorite from './Component/post/Favorite'
import Comment from './Component/post/Comment'

import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import { Login } from './Component/Login';
import Profile from './Component/Profile';
import Reset from './Component/Reset'

// import jwt_decode from 'jwt-decode'
import jwt_decode from 'jwt-decode'
export default class App extends Component {
  state = {
    user: null,
    isLogin: false
  }
  componentDidMount() {
   
    this.userLogin()
  }
  userLogin = () => {

    if (localStorage.token) {
      let token = localStorage.token
      let user = jwt_decode(token, "SECRET").user
      this.setState({
        user: user,
        isLogin: true
      })
    } else {}}


    render() {
      return (
        <Router>
          <Nave isLogin ={this.state.isLogin} userLogin = {this.userLogin}/>
       <Switch>
         <Route path='/Home' component ={Home}/>
         <Route path='/Register' component ={Register}/>
         <Route path='/Login' render ={ (props) => <Login  {...props} userLogin = {this.userLogin}/>}/>
         <Route path='/Forget' component ={Forget}/>
         <Route path='/Reset/:token' component ={Reset}/>
         {/* 

         <Route path='/Forget' component ={Forget}/>
         <Route path='/Message' component ={Message}/>
         <Route path='/About' component ={About}/>
         
         */}

          {this.state.isLogin ? <>   
          <Route path='/Timeline' render={() => <Timeline user={this.state.user} />}/> 
          <Route path='/Favorite' render={(props) => <Favorite {...props} user={this.state.user} />}/>
          <Route path = '/Comment/:id' component={Comment} />
          <Route path='/CreatePost' component ={CreatePost}/> 
          <Route path='/About' component={About} />  
          <Route path="/Profile" render={() => <Profile user={this.state.user} />} /></>
            :
            <> <Redirect to="/Login" /> </>

          }
        </Switch>
      </Router>
    )
  
    
        }}