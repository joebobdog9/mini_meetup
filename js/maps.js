
import React from 'react/addons.js'
import GoogleMap from 'google-map-react'


export class GoogleMapMarked extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="map-container" >
           <GoogleMap
            apiKey ={'AIzaSyB8D-8rkwJQgKvGUP2Bm06T7ZK1AixAm-0'}
            center={[this.props.userLatRelay, this.props.userLongRelay]}
            zoom={12}>
            <UserLocation lat={this.props.userLatRelay} lng={this.props.userLongRelay} zoom={12}  />
            <PetEvent lat={29.737467} lng={-95.337063} zoom={12}  />
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

          border: '3px solid #5c832f',
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
           &#8796;
       </div>
    );
  }
}

var P_WIDTH = 20 , P_HEIGHT = 20 

class PetEvent extends React.Component {
  constructor(props) {
    super(props);
    this.stylez = {
          position: 'absolute',
          width: K_WIDTH,
          height: K_HEIGHT,
          left: -K_WIDTH / 2,
          top: -K_HEIGHT / 2,

          border: '2px solid maroon',
          borderRadius: K_HEIGHT,
          backgroundColor: '#fff',
          textAlign: 'center',
          color: 'maroon',
          fontSize: 12,
          fontWeight: 'bold',
          lineHeight: "20px",
          fontFamily: "Helvetica"
    }
     
  }

  render() {
    return (
       <div style={this.stylez}>
           X
       </div>
    );
  }
}