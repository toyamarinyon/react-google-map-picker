'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGoogleMaps = require('react-google-maps');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  lat: _react.PropTypes.number.isRequired,
  lng: _react.PropTypes.number.isRequired,
  icon: _react.PropTypes.object
};

var defaultProps = {
  icon: {
    url: './1471880603_map-marker.png',
    scaledSize: new google.maps.Size(48, 48)
  }
};

var Picker = function (_React$Component) {
  _inherits(Picker, _React$Component);

  function Picker(props) {
    _classCallCheck(this, Picker);

    var _this = _possibleConstructorReturn(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).call(this, props));

    _this.state = {
      position: {
        lat: props.lat,
        lng: props.lng
      },
      icon: props.icon,
      markerOpacity: 1.0,
      drag: false
    };
    _this.handleDragend = _this.handleDragend.bind(_this);
    _this.handleDragstart = _this.handleDragstart.bind(_this);
    _this.renderCircle = _this.renderCircle.bind(_this);
    return _this;
  }

  _createClass(Picker, [{
    key: 'handleDragend',
    value: function handleDragend(event) {
      var newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.setState({
        position: newPosition,
        drag: false,
        markerOpacity: 1.0
      });
      this.googleMap.panTo(new google.maps.LatLng(newPosition));
    }
  }, {
    key: 'handleDragstart',
    value: function handleDragstart() {
      this.setState({
        drag: true,
        markerOpacity: 0.5
      });
    }
  }, {
    key: 'renderCircle',
    value: function renderCircle() {
      if (this.state.drag) {
        return '';
      }
      var options = {
        strokeColor: '#74b3b9',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#9aede6',
        fillOpacity: 0.5
      };
      return _react2.default.createElement(_reactGoogleMaps.Circle, {
        center: this.state.position,
        radius: Math.sqrt(10) * 100,
        options: options
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var markerOption = {
        crossOnDrag: false
      };
      var mapOption = {
        scrollwheel: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_TOP
        },
        streetViewControl: false,
        mapTypeControl: false
      };
      return _react2.default.createElement(
        'section',
        { style: { height: '100%' } },
        _react2.default.createElement(_reactGoogleMaps.GoogleMapLoader, {
          containerElement: _react2.default.createElement('div', { style: { height: '100%' } }),
          googleMapElement: _react2.default.createElement(
            _reactGoogleMaps.GoogleMap,
            {
              defaultZoom: 15,
              defaultCenter: this.state.position,
              ref: function ref(_ref) {
                _this2.googleMap = _ref;
              },
              options: mapOption
            },
            this.renderCircle(),
            _react2.default.createElement(_reactGoogleMaps.Marker, {
              position: this.state.position,
              draggable: true,
              onDragend: this.handleDragend,
              onDragstart: this.handleDragstart,
              icon: this.state.icon,
              options: markerOption,
              opacity: this.state.markerOpacity
            })
          )
        })
      );
    }
  }]);

  return Picker;
}(_react2.default.Component);

Picker.propTypes = propTypes;

Picker.defaultProps = defaultProps;

exports.default = Picker;