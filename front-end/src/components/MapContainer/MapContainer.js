import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
require('dotenv').config()

const mapStyles = {
  width: '100%',
  height: '100%'
}; 

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: this.props.location.x,
            lng: this.props.location.y
          }
        }
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_geocodeKey}`
})(MapContainer);