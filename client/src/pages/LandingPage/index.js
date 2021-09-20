import React from "react";

import './style.css';

const LandingPage = () => {
  return (
    <div className='d-flex justify-content-center'>
      <div className='vh-100 d-flex flex-column justify-content-center'>
        <form name='landingpage-form'>
          <label htmlFor='username-input' style={{ visibility: 'hidden' }}>Enter your name</label>
          <br />
          <input id='username-input' placeholder='Enter your username' autoFocus />
        </form>
      </div>
    </div>
  )
};

export default LandingPage;
