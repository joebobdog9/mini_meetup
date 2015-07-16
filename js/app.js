
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
	Textarea,
	PageHeader
	} from 'react-bootstrap'

import {PetEvent, 
	    PetEventGroup} from './Post.js'

import {GoogleMapMarked} from './maps.js'


// https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBhFWy-HRucvAqlLb7d-BurCCMsnOxzWsU

Parse = window.Parse
Parse.$ = $
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
    <ListGroupItem href='#/home' className="navbutton">Nearby Events</ListGroupItem>
    <ListGroupItem href='#/link2' className="navbutton">Attending Events</ListGroupItem>
    <ListGroupItem href='#/linkN' className="navbutton">Hosting Events</ListGroupItem>
    <ListGroupItem href='#/postEvent' className="postEvent">Host An Event</ListGroupItem>
    <ListGroupItem href='#/linkN' className="navbutton">Past Events</ListGroupItem>
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
		
		
        u.signUp()
        	.then((user_object) => {
        		window.location.hash = '#/navigation'
    		})
    		.fail((user_object) => {
           	    window.location.hash = '#/login'
           	    alert('You didn\'t make it in the doggy door!')
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
    					<Button  type="submit" href='#home' bsSize="small" className="joinButton" > Submit  </Button>
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


class PostEvent extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			fixMePls: ""
		}
	}

	_handleSubmit(e){
		e.preventDefault();
		var eventNameVal = this.refs.eventName.getDOMNode().value
		var eventLocationVal = this.refs.eventLocation.getDOMNode().value
		var eventDescriptionVal = this.refs.eventDescription.getValue()
		var eventDateVal = this.refs.eventDate.getDOMNode().value
	
		var petEventInstance = new PetEvent()

		petEventInstance.set( 'title' , eventNameVal)
		petEventInstance.set( 'location' , eventLocationVal)
		petEventInstance.set( 'description' , eventDescriptionVal)
		petEventInstance.set( 'date' , eventDateVal)



		petEventInstance.save().then( function(savedModel){
			console.log(savedModel);
			
			window.location.hash = `#/eventDetail/${savedModel.id}`


		})

		

		this.refs.eventName.getDOMNode().value = ''
		this.refs.eventLocation.getDOMNode().value = ''
		this.setState({
			fixMePls: ""
		})
		this.refs.eventDate.getDOMNode().value = ''


	} 

	_hackMeTextArea(e){
		console.log(e.target.value)
		this.setState({
			fixMePls: e.target.value
		})
	}

	render() {
		
		return(

			<div className="hostEvent">
				<Navigation/>
				<div className="host"> 
					<form className="hostForm" onSubmit= {(e) => this._handleSubmit(e)}>
    					<input type='text' ref="eventName" className="eventForm" placeholder="Event Name" /> <br/>
    					<input type='text' ref="eventLocation" className="eventForm" placeholder="Event Location" /><br/>
    					<Input type='textarea' ref="eventDescription" onChange={(e)=>{this._hackMeTextArea(e)} } value={this.state.fixMePls} className="eventDescription" placeholder='Enter your description here...' /><br/>
    					<input type="date" ref="eventDate"className="eventDate"/>
						<Button  type="submit" bsSize="small" className="eventButton" > Post Event  </Button>
					</form>
				</div>
			</div>	

		)
	}
}

class EventDetail extends React.Component{
		constructor(props) {
		super(props)
	}

	render() {
		
		
		return(

			<div className="">
				<Navigation/>
				<div className="post"> 
						<ListGroupItem className="postTitle"> <span className="subHead"> {this.props.eventModel.get('title')} </span></ListGroupItem>
    					<ListGroupItem header='Location' className="postDetails"> {this.props.eventModel.get('location')} </ListGroupItem>
    					<ListGroupItem header='Date'className="postDetails"> {this.props.eventModel.get('date')} </ListGroupItem>
						<ListGroupItem className="postDescription">{this.props.eventModel.get('description')}  </ListGroupItem>						
				</div>
			</div>	

		)
	}
}

export var MeetRouter = Parse.Router.extend({
    
    initialize: function() {
        console.log('app is routing')
        Parse.history.start()
    },

    routes: {
		'navigation' : 'navigate',
		'login' : 'log',
		'home' : 'home',
		'postEvent' : 'postEvent',
		'eventDetail/:eventID' : 'eventDetail',
		'*anything' : 'home'
	},


	log: function(){
		React.render(<LoginView/>, document.querySelector('.wrapper'))
	},

	eventDetail: function(eventID){
		var queryInstance = new Parse.Query(PetEvent)
			queryInstance.equalTo('objectId', eventID)
			queryInstance.find().then((resultObj)=>{ 
				React.render(<EventDetail eventModel={resultObj[0]} />, document.querySelector('.wrapper'))

			})

		
	},

	postEvent: function(){
		React.render(<PostEvent/>, document.querySelector('.wrapper'))
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



