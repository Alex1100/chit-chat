import React, { Component } from 'react';
import Particles from 'reactparticles.js';



class ModalParticles extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let el = document.getElementById("particles-js-tile-3-particles");
    el.style['top'] = "166px";
    el.style['height'] = "325px";
  }



  render() {
    return (
      <div>
        <Particles
          id="tile-3-particles"
          config="../../../src/utils/particles-three.json"
        />
      </div>
    )
  }
}

export default ModalParticles;
