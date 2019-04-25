import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class DesignShowGhana extends Component {
  render() {
    return (
      <div>
        <Link to={`/ghana/designs/edit/${this.props.id}`}>Edit</Link>
        Design Show
      </div>
    );
  }
}

export default DesignShowGhana;