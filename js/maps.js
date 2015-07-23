
import React from 'react/addons.js'
import GoogleMap from 'google-map-react'
import MeetRouter from './app.js'




export class GoogleMapMarked extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      newShitOnTheMap: <div></div>
    }
  }


  _selectedMarkerNotifiesThisComponent(mapDataFromChild){
    this.props.notifyParentUIComponent(mapDataFromChild)
  }

  _goGetMap(mapInChild){
    this.props.relayGMapObject(mapInChild)
  }

  componentDidMount(){
    this._renderMapMarkers(this.props.map_items,this.props.associatedComponent)
  }


  componentWillReceiveProps(newProps){
    this._renderMapMarkers(newProps.map_items, newProps.associatedComponent) ;
  }

  _renderMapMarkers(objectsWithGeoData, eventType){

    if( objectsWithGeoData && objectsWithGeoData.length ){ 
      var resultMarkComponents = objectsWithGeoData.map( (obj) => {
        
        switch (eventType){
          case 'PostEvent':
            //component's mapData-prop expects a googleMap object
            var gmap = obj;

            return ( 
              <NewEventMark 
                lat={gmap.geometry.location.A} 
                lng={gmap.geometry.location.F} 
                mapData={gmap}  
                alertVenueSelection = {this._selectedMarkerNotifiesThisComponent.bind(this)}
                zoom={12}
              />
            )
            break;

          case 'HomeView':
            //component's mapData-prop expects a Parse Model
              var parseModel = obj
             
            return(
              <PetEventMark 
                lat={parseModel.get('location_lat')} 
                lng={parseModel.get('location_lng')} 
                mapData={parseModel}  
                alertVenueSelection = {this._selectedMarkerNotifiesThisComponent.bind(this)}
                zoom={12}
              />
            )
            break;
        }

      })

      this.setState({
        newShitOnTheMap: resultMarkComponents
      })
    }
  }

  render() {



    return (
        <div className="map-container" >
           <GoogleMap
            apiKey ={'AIzaSyB8D-8rkwJQgKvGUP2Bm06T7ZK1AixAm-0'}
            center={[this.props.userLatRelay, this.props.userLongRelay]}
            zoom={12}
            sendUpMap = {this._goGetMap.bind(this)}
            >
            <UserLocation lat={this.props.userLatRelay} lng={this.props.userLongRelay} zoom={12}  />
            {this.state.newShitOnTheMap }
          </GoogleMap>
      </div>
    );
  }
}

var K_WIDTH = 30 , K_HEIGHT = 30 
class UserLocation extends React.Component {
  constructor(props) {
    super(props);
    this.stylez = {
          position: 'absolute',
          width: K_WIDTH,
          height: K_HEIGHT,
          left: -K_WIDTH / 2,
          top: -K_HEIGHT / 2,
          border: '3px solid #66d9c9',
          borderRadius: K_HEIGHT,
          backgroundColor: '#fff',
          textAlign: 'center',
          color: '#363942',
          fontSize: 22,
          fontWeight: 'bold',
          lineHeight: "30px"
    }
     
  }

  render() {
    return (
       <div style={this.stylez}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
              viewBox="0 0 50 50" enable-background="new 0 0 50 50" >
              <g>
                <path fill="#66d9c9" d="M22.6,34.8c0,2.4,0,4.8,0,7.2c-3.6,0-7.2,0-10.8,0c0-0.1,0-0.2,0-0.3c0-5.2,0-10.3,0-15.5
                  c0-0.6,0.2-1,0.7-1.4c2.1-1.9,4.2-3.9,6.3-5.8c1.9-1.7,3.9-3.5,5.8-5.3c0.4-0.3,0.6-0.3,1,0c4,3.7,8,7.3,12,11
                  c0.4,0.4,0.7,0.8,0.7,1.4c0,5.2,0,10.3,0,15.5c0,0.1,0,0.2,0,0.3c-3.6,0-7.2,0-10.8,0c0-2.4,0-4.8,0-7.2
                  C25.8,34.8,24.3,34.8,22.6,34.8z"/>
                <path fill="#66d9c9" d="M7.7,25.2c-0.4,0-0.8,0-1.2,0c-0.1,0-0.2-0.1-0.3-0.2c0.1-0.1,0.1-0.2,0.2-0.2c1.7-1.6,3.5-3.3,5.3-4.9
                  c2.8-2.6,5.6-5.3,8.4-7.9c1.5-1.4,3-2.8,4.5-4.3c0.4-0.3,0.7-0.3,1.1,0c2.9,2.7,5.8,5.4,8.7,8.2c3,2.9,6.2,5.8,9.2,8.7
                  c0.2,0.2,0.2,0.3,0.3,0.5c-0.2,0-0.3,0.1-0.6,0.1c-0.7,0-1.4,0-2.1,0c-0.5,0-0.9-0.2-1.2-0.6c-4.7-4.3-9.3-8.7-14-12.9
                  c-0.1-0.1-0.2-0.2-0.3-0.2c-0.3-0.3-0.7-0.3-1,0c-1,0.9-2.1,1.9-3,2.8c-3.8,3.5-7.6,7.1-11.5,10.5c-0.3,0.3-0.8,0.5-1.3,0.5
                  C8.4,25.2,8,25.2,7.7,25.2L7.7,25.2z"/>
              </g>
          </svg>


       </div>
    );
  }
}

var P_WIDTH = 20 , P_HEIGHT = 20 

class PetEventMark extends React.Component {
  constructor(props) {
    super(props);

    this.eventModel = this.props.mapData
    this.stylez = {
          position: 'absolute',
          width: K_WIDTH,
          height: K_HEIGHT,
          left: -K_WIDTH / 2,
          top: -K_HEIGHT / 2,
          backgroundImage: "../images/petset_logo.svg",
          border: '2px solid #00bfa5',
          borderRadius: K_HEIGHT,
          backgroundColor: '#fff',
          textAlign: 'center',
          color: '#00bfa5',
          fontSize: 12,
          fontWeight: 'bold',
          lineHeight: "20px",
          fontFamily: "Helvetica",
          cursor: 'pointer'
    }

  }

  _handleClick(e){
      e.preventDefault()
 
     window.location.hash = `#/eventDetail/${this.eventModel.id}`
  }


  render() {
    return (
       <div style={this.stylez} onClick={(e)=>this._handleClick(e)} ref='mapMarker' >
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
          viewBox="0 0 100 100" enable-background="new 0 0 100 100">
            <g>
              <g>
                <path fill="#27BAA2" d="M49.1,42c4,0,7.2,1.8,9.5,5.2c1.2,1.8,2.4,3.6,3.6,5.3c1.5,2.3,3.3,4.2,5.3,6c2.8,2.6,4.8,5.6,5.6,9.4
                  c1.1,5.6-2,10.7-7.4,12.2c-2.1,0.6-4.3,0.3-6.4-0.2s-4.2-1.1-6.4-1.6c-3.3-0.8-6.5-0.5-9.7,0.5c-2,0.6-4.1,1.1-6.2,1.5
                  c-2.4,0.4-4.8,0.3-7-1.1c-3.6-2.3-5.3-5.7-4.9-10c0.3-4.2,2.4-7.7,5.5-10.5c2.8-2.6,5.1-5.5,7.3-8.6c1.3-1.9,2.6-3.7,4.3-5.3
                  C44,43,46.2,41.9,49.1,42z"/>
              </g>
              <g>
                <path fill="#27BAA2" d="M69.4,27.4c-0.1,3.7-1.3,7.3-4.3,10.2c-1.4,1.4-3,2.3-5,2.5c-2.7,0.3-4.7-0.9-6.2-3c-1.5-2.1-2-4.5-1.9-7
                  c0.1-4,1.4-7.4,4.3-10.3c1.4-1.4,3.1-2.3,5.1-2.5c2.6-0.2,4.6,1,6.1,3.1C68.9,22.5,69.3,24.7,69.4,27.4z"/>
              </g>
              <g>
                <path fill="#27BAA2" d="M46.6,29.7c-0.1,3-0.7,5.5-2.5,7.7c-2.1,2.5-5.4,3.2-8.3,1.6c-2.5-1.4-4-3.5-5-6.1
                  c-1.3-3.5-1.5-7.1,0.1-10.6c0.8-1.9,2.1-3.4,4.1-4.2c2.6-1,4.9-0.3,7,1.3c2.5,2.1,3.8,4.9,4.4,8.1C46.5,28.3,46.5,29.1,46.6,29.7z
                  "/>
              </g>
              <g>
                <path fill="#27BAA2" d="M84.2,42.2c0,4.7-3,9.4-7.1,11c-4.3,1.8-8.2-0.2-9.3-4.7c-1.3-5.2,2.1-11.7,7.1-13.5
                  c4.5-1.6,8.5,0.8,9.2,5.6C84.1,41.2,84.2,41.7,84.2,42.2z"/>
              </g>
              <g>
                <path fill="#27BAA2" d="M31.4,45.2c0,2.5-0.3,4.1-1.3,5.6c-1.9,3-5.2,3.9-8.5,2.3c-2.6-1.3-4.3-3.4-5.3-6c-1-2.5-1.3-5-0.5-7.6
                  c0.8-2.5,2.3-4.4,5.1-4.9c2.3-0.4,4.4,0.4,6.1,1.9C29.9,39,31.3,42.2,31.4,45.2z"/>
              </g>
              </g>
          </svg>
       </div>
    );
  }
}


var P_WIDTH = 20 , P_HEIGHT = 20 

class NewEventMark extends React.Component {
  constructor(props) {
    super(props);
    this.stylez = {
          position: 'absolute',
          width: K_WIDTH,
          height: K_HEIGHT,
          left: -K_WIDTH / 2,
          top: -K_HEIGHT / 2,
          border: '2px solid #ff726d',
          borderRadius: K_HEIGHT,
          backgroundColor: '#fff',
          textAlign: 'center',
          color: '#00bfa5',
          fontSize: 16,
          fontWeight: 'bold',
          lineHeight: "18px",
          fontFamily: "Helvetica",
          backgroundImage: "../images/locationMark.svg",
          cursor: 'pointer'
    }

  }


  _handleClick(e){
      e.preventDefault()
  
      this.props.mapData

      this.stylez.backgroundColor = 'yellow';

      this.props.alertVenueSelection(this.props.mapData)


  }


  render() {
    return (
      <div style={this.stylez} onClick={(e)=>this._handleClick(e)} ref='mapMarker' >
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 200 200" enable-background="new 0 0 200 200" >
         <g>
          <path fill="#FF726D" d="M121.2,99.3c11.4,0,22.7,0,34.2,0c-18.6,24-36.9,47.9-55.4,71.8c-18.4-23.9-36.8-47.7-55.4-71.7
          c11.5,0,22.7,0,34.1,0c0-23.6,0-47,0-70.6c14.2,0,28.2,0,42.5,0C121.2,52.3,121.2,75.8,121.2,99.3z"/>
        </g>
        </svg>
      </div>
    );
  }
}

