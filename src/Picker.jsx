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
  height: PropTypes.string,
  onChange: PropTypes.func
};

const defaultProps = {
  icon: {
    url: './1471880603_map-marker.png',
    scaledSize: new google.maps.Size(48, 48)
  },
  height: '100%',
  onChange: s => s
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
      markerOpacity: 1.0,
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
      drag: false,
      markerOpacity: 1.0
    });
    this.googleMap.panTo(new google.maps.LatLng(newPosition));
    this.props.onChange(newPosition);
  }

  handleDragstart() {
    this.setState({
      drag: true,
      markerOpacity: 0.5
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
        radius={Math.sqrt(10) * 50}
        options={options}
      />
    );
  }

  render() {
    const markerOption = {
      crossOnDrag: false
    };
    const mapOption = {
      scrollwheel: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
      },
      streetViewControl: false,
      mapTypeControl: false
    };
    return (
      <section style={{ height: this.props.height }}>
        <GoogleMapLoader
          containerElement={
            <div style={{ height: '100%' }} />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={16}
              defaultCenter={this.state.position}
              ref={(ref) => { this.googleMap = ref; }}
              options={mapOption}
            >
              {this.renderCircle()}
              <Marker
                position={this.state.position}
                draggable
                onDragend={this.handleDragend}
                onDragstart={this.handleDragstart}
                icon={this.state.icon}
                options={markerOption}
                opacity={this.state.markerOpacity}
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

