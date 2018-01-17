import React, { Component } from 'react';
import LandingPageCarousel from '../components/LandingPageCarousel';
import LandingPageInformation from '../components/LandingPageInformation';
import Particles from 'reactparticles.js';



class LandingPageParticles extends Component {
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
        <LandingPageCarousel />
        <LandingPageInformation />
      </div>
    )
  }
}

export default LandingPageParticles;
