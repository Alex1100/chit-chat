import React from 'react';
import Carousel from 'nuka-carousel';


const LandingPageCarousel = () => {
  mixins: [Carousel.ControllerMixin];
    return (
      <Carousel className="z-depth-2" decorators={[]} autoplayInterval={5000} easing={"linear"} wrapAround={true} autoplay={true} swiping={true} >
        <div className="carouzel">
          <img className="carouselBack" src="../../images/disagreement_copy.jpg"/>
        </div>
        <div className="carouzel">
          <img className="carouselBack" src="../../images/diverse_crowd_mansplainin.jpg" alt="mansplainin" border="0" />
        </div>
        <div className="carouzel">
          <img className="carouselBack" src="../../images/getting_political.jpg" alt="politics" border="0"/>
        </div>
        <div className="carouzel">
          <img className="carouselBack" src="../../images/grandmas_tips.jpg" alt="timeless-wisdom" border="0"/>
        </div>
        <div className="carouzel">
          <img className="carouselBack" src="../../images/like_what.jpg" alt="i-cant-even" border="0"/>
        </div>
      </Carousel>
    );
};


export default LandingPageCarousel;
