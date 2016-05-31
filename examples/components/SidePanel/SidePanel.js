import React from 'react'
import ReactDOM from 'react-dom'
import styles from '../MainMap/styles.module.css';

const SidePanel=React.createClass({

  render: function() {
    console.log(this.props.places)

    if (this.props.places) {
      var sidePanel =
        <div className={styles.left}>
          {this.props.places.map(place => {
              return (<div key={place.id}>{place.name}</div>)
            })}
        </div>
    } else {
      var sidePanel = "";
    }


    return (
      <div>
      {sidePanel}
      </div>
    )
  }
})

export default SidePanel
