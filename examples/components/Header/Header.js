import React from 'react'
import {Link} from 'react-router'

import styles from './styles.module.css';

const Header=React.createClass({
  render() {
    return (
      <div className={styles.topbar}>
        <Link to="/"><h1>PadStats</h1></Link>
        <section>
          Home
        </section>
      </div>
    )
  }
})

export default Header
