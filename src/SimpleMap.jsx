import React from 'react';
import {
  GoogleMapLoader,
  GoogleMap,
  Marker,
} from 'react-google-maps';

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 *
 * We use React 0.14 stateless function components here.
 * https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 */
const SimpleMap = props => (
  <section style={{ height: '100%' }}>
    <GoogleMapLoader
      containerElement={
        <div
          {...props.containerElementProps}
          style={{ height: '100%' }}
        />
      }
      googleMapElement={
        <GoogleMap
          defaultZoom={6}
          defaultCenter={{ lat: 25.0112183, lng: 121.52067570000001 }}
          onClick={props.onMapClick}
        >
          {props.markers.map((marker, index) => (
            <Marker
              {...marker}
              onRightclick={() => props.onMarkerRightclick(index)}
            />
          ))}
        </GoogleMap>
      }
    />
  </section>
);

export default SimpleMap;
