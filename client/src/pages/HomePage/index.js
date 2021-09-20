import React from "react";
import { useParams } from "react-router";

import './style.css'

const HomePage = () => {
  const params = useParams();

  const getCardColors = difficulty => {
    // (OGWJ) TODO: should make difficulties and colors enums for robustness
    switch (difficulty) {
      case 'EASY':
        return { bg: '#2fa14b', fg: '#ffffff' }
      case 'MEDIUM':
        return { bg: '#1daadd', fg: '#ffffff' }
      case 'HARD':
        return { bg: '#4e4d83', fg: '#ffffff' }
    }
  }

  return (
    <div className='container mt-4 p-nav'>
      <h3 className='m-4'>Welcome {params.username}</h3>
      <div className='container d-flex justify-content-center'>
        <button className='btn btn-secondary'>Create a Room</button>
      </div>
      <ul className='container'>
        <h3 className='mt-4'>Join a Room</h3>
        <li className='card text-center my-3 p-3' style={{
          backgroundColor: getCardColors('EASY').bg,
          color: getCardColors('EASY').fg
        }}>
          <h3>Room A</h3>
          <span>Category A</span>
          <span>EASY</span>
        </li>
        <li className='card text-center my-3 p-3' style={{
          backgroundColor: getCardColors('MEDIUM').bg,
          color: getCardColors('MEDIUM').fg
        }}>
          <h3>Room B</h3>
          <span>Category B</span>
          <span>Medium</span>
        </li>
        <li className='card text-center my-3 p-3' style={{
          backgroundColor: getCardColors('HARD').bg,
          color: getCardColors('HARD').fg
        }}>
          <h3>Room C</h3>
          <span>Category C</span>
          <span>Hard</span>
        </li>
      </ul>
    </div>
  )
};

export default HomePage;