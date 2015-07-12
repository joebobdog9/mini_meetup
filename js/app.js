
import {Promise} from 'es6-promise'
import $ from 'jquery'
import Backbone from 'backbone'
import React from 'react'
import {
	Nav,
	Navbar,
	NavItem,
	MenuItem,
	DropdownButton,
	Input,
	Alert,
	ListGroupItem,
	ListGroup,
	Button,
	Search} from 'react-bootstrap'

import {GoogleMapMarked} from './maps.js'

var Parse = window.Parse


class Navigation extends React.Component {
	constructor(props) {
		super(props)
	}

	render(){

		console.log('rendering')

	return(	
	<div className="navigationBars">

  <ListGroup className="sidebar">
    <ListGroupItem href='#link1' className="navbutton">Nearby Events</ListGroupItem>
    <ListGroupItem href='#link2' className="navbutton">Attending Events</ListGroupItem>
    <ListGroupItem href='#linkN' className="navbutton">Hosting Events</ListGroupItem>
    <ListGroupItem href='#linkN' className="navbutton">Host An Event</ListGroupItem>
    <ListGroupItem href='#linkN' className="navbutton">Past Events</ListGroupItem>
  </ListGroup>

  <Navbar className="mynavstyle" brand={<a href="#" className="brand" img src="../images/petset.png"> </a>}>
  <Input  className="navSearch"
          type='search'
          placeholder='Enter Your Location'/>
   <Nav>  <button type="button" className="searchButton"> Search! </button>

 
        
    </Nav>
  </Navbar>
  	
	</div>
    )}
}


class LoginView extends React.Component {
	constructor(props) {
		super(props)
		this.state = { error: 0 }
	}

	_signupOrLogin(e){
		e.preventDefault()


		
		var u = new Parse.User(),
			emailInput = this.refs.userEmail.getValue(),
			passwordInput = this.refs.userPassword.getValue()


		u.set({
			email: emailInput,
			password: passwordInput,
			username: emailInput
		})
		
		
        u.signUp().then((user_object) => {
        	window.location.hash = '#/navigation'
    		})




        u.signUp.fail((user_object) => {
            var login = u.logIn()
            login.then((e) => window.location.hash = '#/navigation')
            login.fail((...args) => {
                this.setState({error: this.state.error + 1 })
            })
        })
    }

	render(){

			 var error = this.state.error ? (<p className="error-message">{this.state.error} try - password invalid</p>) : ''

		return(

			<div>

				<i  className="fa fa-paw"></i>
					<form onSubmit={(e) => this._signupOrLogin(e)}>
    					<Input type='email'ref="userEmail"  placeholder='Enter Email' className='logEmail' />
    					<Input type='password' ref="userPassword" placeholder='Enter Password' className='logPass' />
    					<Button  type="submit" bsSize="small" className="joinButton" > Submit  </Button>
    				</form>
    		</div>
    	

    	)
	}
}

class Home extends React.Component {
		constructor(props) {
		super(props)
	}

	render() {
		
		return(

			<div className="homeView">
				<Navigation/>
				<GoogleMapMarked/>

			 </div>

		)
	}

}

export var meetRouter = Parse.Router.extend({
    
    initialize: function() {
        console.log('app is routing')
        Parse.history.start()
    },

    routes: {
	'navigation' : 'navigate',
	'login' : 'log',
	'home' : 'home',
	'*anything' : 'home'
},

	// navigate: function(){
	// 	React.render(<Navigation/>, document.querySelector('wrapper'))
	// },

	log: function(){
		React.render(<LoginView/>, document.querySelector('.wrapper'))
	},

	home: function(){
		React.render(<Home/>, document.querySelector('.wrapper'))
	}


 })



