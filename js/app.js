
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


class Navigation extends React.Component {
	constructor(props) {
		super(props)
	}

	render(){

		console.log('rendering')

	return(
	
<wrapper>

  <ListGroup className="sidebar">
    <ListGroupItem href='#link1' className="navbutton">Nearby Events</ListGroupItem>
    <ListGroupItem href='#link2' className="navbutton">Attending Events</ListGroupItem>
    <ListGroupItem href='#linkN' className="navbutton">Hosting Events</ListGroupItem>
    <ListGroupItem href='#linkN' className="navbutton">Host An Event</ListGroupItem>
    <ListGroupItem href='#linkN' className="navbutton">Past Events</ListGroupItem>
  </ListGroup>

  <Navbar className="mynavstyle" brand={<a href="#" className="brand"> PetSet </a>}>
  <Input className="navSearch"
        type='search'
        placeholder='Enter Your Location'/>
   <Nav>

  <Button bsSize="xsmall" className="searchButton"> Submit </Button>
        
    </Nav>
  </Navbar>
</wrapper>
    )}
}


export var meetRouter = Parse.Router.extend({
    
    initialize: function() {
        console.log('app is routing')
        Parse.history.start()
    },

    routes: {
	'navigation' : 'navigate',
	'myLogin' : 'myLogin',
	'*anything' : 'home'
},

	navigate: function(){
		React.render(<Navigation/>, document.querySelector('body'))
	},

	login: function(){
		React.render(<login/>, document.querySelector('body'))
	},

	home: function(){
		React.render(<Navigation/>, document.querySelector('body'))
	}


 })


class Login extends React.Component {
	constructor(props) {
		super(props)
	}

	render(){

		return(
			<div class="mylogin">
			    <div class="wrapper">
			        <form class="form-horizontal">
			            <div class="form-group">
			                <div class="col-sm-10">
			                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email"></input>
			                </div>
			            </div>
			            <div class="form-group">
			                
			                <div class="col-sm-10">
			                    <input type="password" class="form-control" id="inputPassword3" placeholder="Password"></input>
			                </div>
			            </div>
			            <div class="form-group">
			                <div class="col-sm-offset-2 col-sm-10">
			                    <div class="checkbox">
			                        <label>
			                            <input type="checkbox"> Remember me </input>
			                        </label>
			                    </div>
			                </div>
			            </div>
			            <div class="form-group">
			                <div class="col-sm-offset-2 col-sm-10">
			                    <button type="submit" class="btn btn-default">Sign in</button>
			                </div>
			            </div>
			        </form>
			    </div>
			   </div>
		)
	}
}

// React.render(<Login/>, document.querySelector('body'))
