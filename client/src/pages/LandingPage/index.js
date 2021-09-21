import React from "react";
import { usernameSubmitHandler } from "../../handlers/usernameSubmitHandler";

import './style.css';

const LandingPage = () => {
  return (
    <div className='d-flex justify-content-center'>
      <div className='vh-100 d-flex flex-column justify-content-center'>
        <form name='landingpage-form' onSubmit={usernameSubmitHandler}>
          <label htmlFor='username-input' style={{ visibility: 'hidden' }}>Enter your name</label>
          <br />
          <input id='username-input' placeholder='Enter your username' autoFocus />
          <input type='submit' />
        </form>
      </div>
    </div >
  )
};

export default LandingPage;
