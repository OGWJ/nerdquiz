import React from "react";

import './style.css'

const QuizFinishedPage = () => {
  return (
    <>
      <div className='container p-nav leaderboard-container'>
        <table className='table'>
          <thead>
            <tr className='d-flex justify-content-between'>
              <th scope='col'>Rank</th>
              <th scope='col'>Username</th>
              <th scope='col'>Category</th>
              <th scope='col'>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr className='d-flex justify-content-between'>
              <th scope='row'>1</th>
              <td>Mad Lad</td>
              <td>Video Games</td>
              <td>69420</td>
            </tr>
            <tr className='d-flex justify-content-between'>
              <th scope='row'>2</th>
              <td>Big Sal 6</td>
              <td>Marvel Films</td>
              <td>666</td>
            </tr>
          </tbody>
        </table>


      </div>
    </>
  )
};

export default QuizFinishedPage;
