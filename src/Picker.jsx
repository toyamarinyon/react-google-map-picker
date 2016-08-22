import React, { PropTypes } from 'react';
import {
  GoogleMapLoader,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
};

function Picker(props) {
  const position = { lat: props.lat, lng: props.lng };
  return (
    <section style={{ height: '100%' }}>
      <GoogleMapLoader
        containerElement={
          <div style={{ height: '100%' }} />
        }
        googleMapElement={
          <GoogleMap defaultZoom={6} defaultCenter={position} >
            <Marker position={position} draggable />
          </GoogleMap>
        }
      />
    </section>
  );
}

Picker.propTypes = propTypes;

export default Picker;

