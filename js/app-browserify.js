'use-strict';
require('es5-shim');
require('babel/register')

import {Promise} from 'es6-promise'
import $ from 'jquery'
import Backbone from 'backbone'
import React from 'react'
// import * as Images from './images.js'
import {MeetRouter} from './app.js' 





window.addEventListener('load', function(){
      var ok = new MeetRouter()
})

var petRouter = new MeetRouter ();