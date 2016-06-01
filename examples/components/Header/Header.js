import React from 'react'
import {Link} from 'react-router'

import styles from './styles.module.css';
import MainMap from '../../components/MainMap/MainMap'
import ReactDOM from 'react-dom'
import {searchNearby} from '../../../src/lib/placeshelper.js'

const Header=React.createClass({
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

      var places_types = [
        'convenience_store',
        'gym',
        'grocery_or_supermarket',
        'school',
        'library',
        'museum'
      ];

      var places = [];

      var user_selection = [places_types[0],places_types[1],places_types[2]]

      for (var i=0; i<user_selection.length; i++){


      const opts = {
        location: map.center,
        radius: '500',
        types: [user_selection[i]]
      }

      console.log(user_selection[i])

      searchNearby(google, map, opts)
        .then((results, pagination) => {

          places.push(results)

          console.log(results)
          console.log(places)

        if (places.length == user_selection.length){
          this.setState({
            places: places[0],
            arrayPlaces: places,
            pagination
          })
        }
// !!!
        })
      }
    })
  },
  render: function() {
    const props = this.props;
    const {position} = this.state;

    return (
      <div>
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

        <div>
          <MainMap {...props}
            position= {this.state.position}
            places ={this.state.places}
            arrayPlaces = {this.state.arrayPlaces}/>
        </div>
      </div>
    )
  }
})

export default Header
