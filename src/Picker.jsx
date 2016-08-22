import React, { PropTypes } from 'react';
import {
  GoogleMapLoader,
  GoogleMap,
  Marker,
  Circle
} from 'react-google-maps';

const propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  icon: PropTypes.object,
  dragIcon: PropTypes.object,
};

const defaultProps = {
  icon: {
    url: './1471880603_map-marker.png',
    scaledSize: new google.maps.Size(48, 48)
  },
  dragIcon: {
    url: './1471880603_map-marker.png',
    scaledSize: new google.maps.Size(48, 48)
  }
};

class Picker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {
        lat: props.lat,
        lng: props.lng
      },
      icon: props.icon,
      drag: false
    };
    this.handleDragend = this.handleDragend.bind(this);
    this.handleDragstart = this.handleDragstart.bind(this);
    this.renderCircle = this.renderCircle.bind(this);
  }

  handleDragend(event) {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    this.setState({
      position: newPosition,
      icon: this.props.icon,
      drag: false
    });
    this.googleMap.panTo(new google.maps.LatLng(newPosition));
  }

  handleDragstart() {
    this.setState({
      icon: this.props.dragIcon,
      drag: true
    });
  }

  renderCircle() {
    if (this.state.drag) {
      return '';
    }
    const options = {
      strokeColor: '#74b3b9',
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: '#9aede6',
      fillOpacity: 0.5,
    };
    return (
      <Circle
        center={this.state.position}
        radius={Math.sqrt(10) * 100}
        options={options}
      />
    );
  }

  render() {
    return (
      <section style={{ height: '100%' }}>
        <GoogleMapLoader
          containerElement={
            <div style={{ height: '100%' }} />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={15}
              defaultCenter={this.state.position}
              ref={(ref) => { this.googleMap = ref; }}
            >
              {this.renderCircle()}
              <Marker
                position={this.state.position}
                draggable
                onDragend={this.handleDragend}
                onDragstart={this.handleDragstart}
                icon={this.state.icon}
              />
            </GoogleMap>
          }
        />
      </section>
    );
  }
}

Picker.propTypes = propTypes;

Picker.defaultProps = defaultProps;

export default Picker;

