import React from 'react'
import ReactDOM from 'react-dom'
import styles from '../MainMap/styles.module.css';

//counter for the position of the returned POI data list under each of the categories selected...each digit in this array represents a separate counter for a category
var counters=[];

const SidePanel=React.createClass({
  componentDidUpdate(prevProps) {
      counters=[];
      for (var i=0; i<this.props.userSelectionWords.length; i++){
        counters.push(0);
        this.poiManager(i);
      }
  },
  handlePlusArrow: function(i) {
    if(counters[i]<this.props.poiObject[this.props.userSelection[i]].length-1){
      counters[i] += 1
    }
    console.log(i)
    console.log(counters[i])
    this.poiManager(i);
  },
  handleMinusArrow: function(i) {
    if(counters[i]>0){
      counters[i] -= 1
    }
    this.poiManager(i);
  },
  poiManager: function(i) {
    //manages user controlled scrolling of POI data under each category (which are controlled by the checkbox)
    const aref = this.refs[this.props.userSelectionWords[i]];
    const node = ReactDOM.findDOMNode(aref);
    const divID = "resultsDiv"
    const divToRemove = document.getElementById(divID)
    //create a new p which will contain the POI result for that category
    var p = document.createElement('p');
    p.innerHTML = this.props.poiObject[this.props.userSelection[i]][counters[i]].name
    //remove old p
    if(node.childNodes[2]){
      node.removeChild(node.childNodes[2])
    }
    //append new p
    node.appendChild(p)
  },

  render: function() {
    var poiRender=[];
    //if the object with all POI data is delivered
    if (this.props.poiObject) {
    //create a POI Render object which will have divs of category headings (controlled by checkboxes) and related content as children
    for (var i=0; i<this.props.userSelectionWords.length; i++)
      {
        poiRender.push(
          <div id={this.props.userSelectionWords[i]} key={i} className={styles.poiCategory} ref={this.props.userSelectionWords[i]} >
            <div className={styles.categoryContainer}>{this.props.userSelectionWords[i]}</div>
              <div className={styles.buttonContainer}>
                <div className={styles.plus} onClick={this.handlePlusArrow.bind(this, i)}>+</div>
                <div className={styles.minus} onClick={this.handleMinusArrow.bind(this, i)}>-</div>
              </div>
          </div>)
      }
    }

    if (this.props.poiObject) {
      var sidePanel =
        <div className={styles.left}>
        {poiRender}
        </div>;
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
