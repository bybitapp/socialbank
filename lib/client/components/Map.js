import React from 'react'
import GoogleMapReact from 'google-map-react'
// import { connect } from 'react-redux'
import { compose } from 'recompose'
import Marker from './Marker'

const enhance = compose(
  // connect(state => ({ projects: state.projects }))
)

class Map extends React.Component {
  onChildClick (key, { id }) {
    console.log('onChildClick')
  }

  render () {
    const { organizations } = this.props

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCkwfHICB6QowBNjiGBZc12MH2HbdZnHbM' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onChildClick={this.onChildClick}
        options={this.props.options}
      >
        { Object.keys(organizations).map((key, index) => {
          const o = organizations[key]
          return (
            <Marker
              key={key}
              text={o.name}
              {...o} />
          )
        })}
      </GoogleMapReact>
    )
  }
}

Map.defaultProps = {
  center: {lat: 51.52, lng: -0.085},
  zoom: 12,
  options: {scrollwheel: false},
  projects: {}
}

export default enhance(Map)
