
import React from 'react/addons.js'
import GoogleMap from 'google-map-react'

export class GoogleMapMarked extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="map-container"     style= {{height: 400}}>
           <GoogleMap
            apiKey ={'AIzaSyB8D-8rkwJQgKvGUP2Bm06T7ZK1AixAm-0'}
            center={[29.75043, -95.337157]}
            zoom={12}>
            <MyGreatPlace lat={29.737467} lng={-95.337063}zoom={12}  />
          </GoogleMap>
      </div>
    );
  }
}

var K_WIDTH = 30 , K_HEIGHT = 30 


class MyGreatPlace extends React.Component {
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