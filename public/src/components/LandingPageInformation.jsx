import React from 'react';
import { Link } from 'react-router-dom';


const LandingPageInformation = () => (
  <div>
    <h1 className="welcome-font">Welcome to Chit-Chat!</h1>
    <h3 className="welcome-info-font">
      A platform for content creators to bring up a topic of discussion, whether educational,
      political, or inquisitive in nature, in order for others to jump on the discussion board
      and give their two cents. Well, in the case of this platform, Users would donate ether
      if the content creator is deemed worthy of the Ethereum contribution. The difference
      between Steemit or Reddit and this site, would be that the content creator must
      always begin a thread with a Video. This promotes a healthy discussion since everyone
      will end up seeing their face.
    </h3>
    <Link
      to="/signup"
      className="welcome-signup">
      Signup and Make your point!
    </Link>
  </div>
);


export default LandingPageInformation;
