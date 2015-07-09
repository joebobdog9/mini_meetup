
import {Promise} from 'es6-promise'
import $ from 'jquery'
import Backbone from 'backbone'
import React from 'react'
import {Nav} from 'react-bootstrap'


class Navigation extends React.Component {
	constructor(props) {
		super(props)
	}

	render(){

		console.log('rendering')

	return(
	 <div className="wrapper">
        <nav className="navbar navbar-default navbar-fixed-top mynavstyle">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="">&#10042;</a>
     			</div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                   
                        <li><a href="#">Link</a></li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li role="separator" className="divider"></li>
                                <li><a href="#">Separated link</a></li>
                            </ul>
                        </li>
                     </ul>
               	</div>
            </div> 
        </nav>

        <div className="list-group sidebar ">
            <button type="button" className="list-group-item navbutton"><i className="fa fa-location-arrow"></i> Nearby Events</button>
            <button type="button" className="list-group-item navbutton">Events Attending</button>
            <button type="button" className="list-group-item navbutton">Events Hosting</button>
            <button type="button" className="list-group-item navbutton">Past Events</button>
            <button type="button" className="list-group-item navbutton">Host An Event</button>
        </div>
     </div>
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
React.render(<Navigation/>, document.querySelector('body'))