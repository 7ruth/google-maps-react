import React from 'react'
import ReactDOM from 'react-dom'

import Map, {Marker, GoogleApiWrapper} from '../../../src/index'
import {Link} from 'react-router'
import styles from './styles.module.css';
import {searchNearby} from '../../../src/lib/placeshelper.js'
import SidePanel from '../../components/SidePanel/SidePanel'


const MainMap = React.createClass({
  getInitialState() {
    return {
      place: null,
      position: null
    }
  },
  render: function() {
    const props = this.props;
    if (this.props.position){
      var sidepanel =
        <div className={styles.left}>
          <SidePanel {...props}
            poiObject = {this.props.poiObject}
            placesTypes = {this.props.placesTypes}
            userSelection = {this.props.userSelection}
            userSelectionWords ={this.props.userSelectionWords}/>
        </div>;
      } else {
        var sidepanel = <div></div>;
      }

    return (
      <div className={styles.flexWrapper}>
        {sidepanel}
        <div className={styles.right}>
          <Map {...props}
              containerStyle={{
                position: 'relative',
                height: '100vh',
                width: '100%'
              }}
              center={this.props.position}
              centerAroundCurrentLocation={false}>
                <Marker position={this.props.position} />
          </Map>
        </div>
      </div>
    )
  }
})

export default MainMap
