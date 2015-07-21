
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
	PageHeader,
	CollapsibleNav

	} from 'react-bootstrap'

import {PetEvent, 
	    PetEventGroup} from './Post.js'

import {GoogleMapMarked, 
		PetEventMark,
		UserLocation}
		from './maps.js'

import  {getLatLonDistance} from './distance.js'






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
 
	 <Navbar  className="navBar" brand='Pet Set'  imgsrc="../images/petset_logoW.svg" toggleNavKey={0}>
	    <CollapsibleNav eventKey={0}> {/* This is the eventKey referenced */}
	      <Nav navbar>
	       <NavItem  className="navLink" eventKey={1} href='#/home'>Home</NavItem>
	        <NavItem className="navLink" eventKey={1} href='#/postEvent'>Post</NavItem>
	        <NavItem className="navLink" eventKey={2} href='#'>Nearby Posts</NavItem>
	        <NavItem className="navLink" eventKey={2} href='#'>Past Posts</NavItem>
	      </Nav>
	      <Nav navbar right>
	        <NavItem eventKey={1} href='#'>Logout</NavItem>
	        
	      </Nav>
	    </CollapsibleNav>
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
				<Places />
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
		this.state = {
			queryResults : null
		}
	}

	_getGMapObject(map){
		console.log('Top-Level')
		this.gmap = map
	}


	render() {
		
		return(

			<div className="homeView">
				<Navigation/>
				<GoogleMapMarked relayGMapObject={this._getGMapObject.bind(this)} userLatRelay={this.props.userLat} userLongRelay={this.props.userLong}/>
				<input type="text" ref="placesQuery"/>
				
				<ol>{this.state.queryResults}</ol>
			 </div>

		)
	}

}


class PostEvent extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			fixMePls: "",
			placesAsDOMNodes: null,
			searchedPlaces: null
		}
	}

	_handleSubmit(e){
		e.preventDefault();

		// if (!this.state.selectedVenue){
		// 	alert('Please pick a venue from the map')
		// 	return 	
		// } 

		var eventNameVal = this.refs.eventName.getDOMNode().value
		var eventLocationVal = this.refs.eventLocation.getDOMNode().value
		var eventLocationDetailsVal = this.refs.eventLocationDetails.getDOMNode().value
		var eventDescriptionVal = this.refs.eventDescription.getValue()
		var eventDateVal = this.refs.eventDate.getDOMNode().value
		var eventTimeVal = this.refs.eventTime.getDOMNode().value

	
		var petEventInstance = new PetEvent()

		petEventInstance.set( 'title' , eventNameVal)
		petEventInstance.set( 'location_venue' , this.state.selectedVenue.vicinity)
		petEventInstance.set( 'location_lat' , this.state.selectedVenue.geometry.location.A)
		petEventInstance.set( 'location_lng' , this.state.selectedVenue.geometry.location.F)
		petEventInstance.set( 'location_gMap' , this.state.selectedVenue)

		var geopoint = new Parse.GeoPoint(
				this.state.selectedVenue.geometry.location.A,
				this.state.selectedVenue.geometry.location.F
			)

		petEventInstance.set( 'location_geopoint' , geopoint)

		petEventInstance.set( 'locationDetails' , eventLocationDetailsVal)
		petEventInstance.set( 'description' , eventDescriptionVal)

		console.log(eventTimeVal)


		var dateStringArray = eventDateVal.split('-')
		var dateNumberArray = dateStringArray.map( (dateString) => {
			return parseInt(dateString) 
		})

		var timeStringArray = eventTimeVal.split(':')
		var timeNumberArray = timeStringArray.map( (timeString) => {
			return parseInt(timeString) 


		})

		console.log(timeNumberArray)
		var jsDateObject = new Date(
			dateNumberArray[0],
			dateNumberArray[1]-1,
			dateNumberArray[2],
			timeNumberArray[0],
			timeNumberArray[1]
			)



		console.log(jsDateObject)

		petEventInstance.set( 'date' , jsDateObject)




		console.log(petEventInstance)
		console.log(eventDateVal)

		this.refs.eventName.getDOMNode().value = ''
		this.refs.eventLocation.getDOMNode().value = ''
		this.refs.eventLocationDetails.getDOMNode().value = ''
		this.setState({
			fixMePls: ""
		})
		this.refs.eventDate.getDOMNode().value = ''
		this.refs.eventDate.getDOMNode().value = ''


		petEventInstance.save().then((savedModel)=>{
				alert('You saved that shit!')

		})

	} 

	_hackMeTextArea(e){
		console.log(e.target.value)
		this.setState({
			fixMePls: e.target.value
		})
	}




	__showVenues(placesArray){
		var RComponents = placesArray.map((place) =>{
			
			return (
				<tr>
				    <th scope="row">1</th>
				    <td>{place.name}</td>
				    <td>{place.vicinity}</td>
				</tr>
			)
		})

		this.setState({
			placesAsDOMNodes: RComponents,
			searchedPlaces: placesArray
		})

	}

	_getGMapObject(map){
		console.log('Top-Level')
		this.gmap = map
	}

	_handlePlaceSearch(e){
		e.preventDefault()

	
		var queryName = this.refs.eventLocation.getDOMNode().value

		console.log(queryName)

		this.__getPlaces(this.gmap, queryName)
			.then(function(returnedResults){
				console.log(returnedResults)

				this.__showVenues(returnedResults)



			}.bind(this))
	}



	__getPlaces(gmap,query){

		var jqPromise = $.Deferred()


		var service = new google.maps.places.PlacesService(gmap);
        var location = new google.maps.LatLng(this.props.userLat,this.props.userLong);
        var request = {
            location: location,
            radius: '10000',
            name: query
          };

        service.nearbySearch(request, (searchResults, status)=>{
        	console.log(searchResults)
            return jqPromise.resolve(searchResults)

        })

        return jqPromise
	}
	
	_handleVenueSelection(selectedGmap){
		console.log(selectedGmap)
		var filteredSingleMap = this.state.searchedPlaces.filter((resultGmap) =>{
			
			return selectedGmap.id === resultGmap.id 
		})

		var RComponent = filteredSingleMap.map((place) =>{
			
			return (
				<tr>
				    <th scope="row">1</th>
				    <td>{place.name}</td>
				    <td>{place.vicinity}</td>
				</tr>
			)
		})

		this.setState({
			placesAsDOMNodes: RComponent,
			searchedPlaces: filteredSingleMap,
			selectedVenue: filteredSingleMap[0]
		})



	}

	render() {
		console.log
		return(

			<div className="hostEvent">
				<Navigation/>

				
				<div className="host"> 
					<form className="hostForm" onSubmit= {(e) => this._handleSubmit(e)}>
    					<input type='text' ref="eventName" className="eventForm" placeholder="Event Name" /> <br/>
    					<input type='text' ref="eventLocation" className="eventForm" placeholder="Event Location" /> <button className="btn btn-default btn-sm" onClick={this._handlePlaceSearch.bind(this)}> Search </button><br/>
    					<table className="table table-hover">
    						 <caption>Select Location on Map</caption>
						      <thead>
						        <tr>
						          <th>#</th>
						          <th>Venue Name</th>
						          <th>Address</th>
						        </tr>
						      </thead>
						      <tbody>
						     	{this.state.placesAsDOMNodes}
						      </tbody> 
    					</table>
    					<input type='text' ref="eventLocationDetails" className="eventForm" placeholder="Event Location Details" /><br/>
    					<GoogleMapMarked 
    						associatedComponent = "PostEvent"
    						postEvent_map_items={this.state.searchedPlaces}
    						className="hostMap" 
    						relayGMapObject={this._getGMapObject.bind(this)} 
    						userLatRelay={this.props.userLat} 
    						userLongRelay={this.props.userLong}
    						notifyParentUIComponent={this._handleVenueSelection.bind(this)}
    					/>
    					<Input 
		    					type='textarea' 
		    					ref="eventDescription" 
		    					onChange={(e)=>{this._hackMeTextArea(e)} } 
		    					value={this.state.fixMePls} className="eventDescription" 
		    					placeholder='Enter your description here...' /><br/>
		    			<input type="date" ref="eventDate"className="eventDate"/>
		    			<input type="time" ref="eventTime" className="eventDate"/>


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
		navigator.geolocation.getCurrentPosition(function(data){
			console.log(data);
			data.coords.latitude 
			data.coords.longitude
			React.render(<PostEvent userLat={data.coords.latitude} userLong={data.coords.longitude}/>, document.querySelector('.wrapper'))
		})
	},


	home: function(){
		document.querySelector('.wrapper').innerHTML=`<img src="./bower_components/svg-loaders/svg-loaders/puff.svg" />`
		navigator.geolocation.getCurrentPosition(
			function(pos){
				//new Parse.Query() for events in area 
				// Area determined by a <, > queries on events lat & lng 



				React.render(<Home userLat={pos.coords.latitude} userLong={pos.coords.longitude}/>, document.querySelector('.wrapper'))
			},
			function(error){
				alert('geoloc not successful')
			}	
		)
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



