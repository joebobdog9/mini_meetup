
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
	Search,
	Textarea

	} from 'react-bootstrap'


import {GoogleMapMarked} from './maps.js'


https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBhFWy-HRucvAqlLb7d-BurCCMsnOxzWsU

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

  <Navbar className="mynavstyle" brand={<a href="#" className="brand" img src="../images/petset_150.gif"> </a>}>
  	<Input  className="navSearch" type='text'placeholder='Enter Your Location'/>
  		<button type="button" className="searchButton"> Search! </button>      
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

			<div className="logBg">
					<div className="logLogo"> </div>
					<form className="formLog" onSubmit={(e) => this._signupOrLogin(e)}>
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
				<GoogleMapMarked userLatRelay={this.props.userLat} userLongRelay={this.props.userLong}/>


			 </div>

		)
	}

}
class EventListing extends React.Component{
		constructor(props) {
		super(props)
	}

	render() {
		
		return(

			<div className="EventListing">
				
			</div>	

		)
	}
}

class Host extends React.Component{
		constructor(props) {
		super(props)
	}

	render() {
		
		return(

			<div className="hostEvent">
				<Navigation/>
				<div className="host"> 
					<form className="hostForm">
    					<Input type='text' className="eventForm" placeholder='Event Name' />
    					<Input type='text'  className="eventForm" placeholder='Event Location' />
    					<Input type='text'  className="eventForm" placeholder='Event Date' />
    					<Input type='textarea'  className="eventForm" placeholder='Enter your event description here...' />
						<Button  type="submit" bsSize="small" className="eventButton" > Post Event  </Button>
					</form>
				</div>
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
	'eventHost' : 'eventHost',
	'*anything' : 'home'
},


	log: function(){
		React.render(<LoginView/>, document.querySelector('.wrapper'))
	},

	eventHost: function(){
		React.render(<Host/>, document.querySelector('.wrapper'))
	},

	home: function(){
		document.querySelector('.wrapper').innerHTML=`<img src="./bower_components/svg-loaders/svg-loaders/puff.svg" />`
		navigator.geolocation.getCurrentPosition(function(data){
			console.log(data);
			data.coords.latitude 
			data.coords.longitude
			React.render(<Home userLat={data.coords.latitude} userLong={data.coords.longitude}/>, document.querySelector('.wrapper'))
		})
		// getCurrentPosition(theSuccessFunction, theFailFunction){

			//1 - does it's magic to get the geolocation...we ca't see this
			// ...but we know it will execute a function and pass the position 
			
			//2 - if (successfulRequest) {  
			//		theSucessFunction(position) )   <---we have to give it this function
			//		} else {
			//			theFailFunction(error)      <----we have to give it this one too!!
			//	     }
		
	}


 })



