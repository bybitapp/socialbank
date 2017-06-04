import React from 'react'
import GoogleMapReact from 'google-map-react'
// import { connect } from 'react-redux'
import { compose } from 'recompose'
import Marker from './Marker'

const enhance = compose(
  // connect(state => ({ projects: state.projects }))
)

class Map extends React.Component {
  static defaultProps = {
    center: {lat: 51.52, lng: -0.085},
    zoom: 16,
    options: {scrollwheel: false},
    projects: {}
  };

  onChildClick = (key, { id }) => {
      console.log('onChildClick');
  }

  render() {
    const { organizations } = this.props

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCkwfHICB6QowBNjiGBZc12MH2HbdZnHbM" }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onChildClick={this.onChildClick}
        options={this.props.options}
      >
      { Object.keys(organizations).map((key, index) => {
          const o = organizations[key]
          return (
              <Marker
                key={o.id}
                lat={o.lat}
                lng={o.lng}
                text={o.name}
                icon={o.icon}
                {...o}/>
          ) ;
      })}
      </GoogleMapReact>
    );
  }
}

export default enhance(Map)
