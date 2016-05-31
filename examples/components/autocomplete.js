import React from 'react'
import ReactDOM from 'react-dom'

import Map, {Marker, GoogleApiWrapper} from '../../src/index'
import styles from './autocomplete.module.css'
import {Link} from 'react-router'
import {searchNearby} from '../../src/lib/placeshelper.js'

const Contents = React.createClass({
  getInitialState() {
    return {
      place: null,
      position: null
    }
  },

  onSubmit: function(e) {
    e.preventDefault();
  },

  componentDidMount: function() {
    this.renderAutoComplete();
  },

  componentDidUpdate(prevProps) {
    const {google, map} = this.props;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  },

  renderAutoComplete: function() {
    const {google, map} = this.props;

    if (!google || !map) return;

    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);
    var autocomplete = new google.maps.places.Autocomplete(node);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(12);
      }

      this.setState({
        place: place,
        position: place.geometry.location
      })

      const opts = {
        location: map.center,
        radius: '500',
        types: ['cafe']
      }
      searchNearby(google, map, opts)
        .then((results, pagination) => {
          this.setState({
            places: results,
            pagination
          })
// !!!

        }).catch((status, result) => {
          // There was an error
      })
    })
  },

  render: function() {
    const props = this.props;
    const {position} = this.state;

    console.log(this.state.places)


    return (
      <div className={styles.flexWrapper}>
        <div className={styles.topbar}>
          <Link to="/"><h1>PadStats</h1></Link>
          <section>
          <form onSubmit={this.onSubmit}>
            <input
              ref='autocomplete'
              type="text"
              placeholder="Enter a location" />
            <input
              className={styles.button}
              type='submit'
              value='Go' />
          </form>
          </section>
        </div>

        <div className={styles.right}>
          <Map {...props}
              containerStyle={{
                position: 'relative',
                height: '100vh',
                width: '100%'
              }}
              center={this.state.position}
              centerAroundCurrentLocation={false}>
                <Marker position={this.state.position} />


          </Map>
        </div>
      </div>
    )

  }
})


export default Contents
