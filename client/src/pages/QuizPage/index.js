import React, { useState } from "react";
import { useEffect } from "react";
import { socket } from "../../service/socket";

import './style.css'

const QuizPage = () => {

  const [isUserTurn, setIsUserTurn] = useState(false);
  const [question, setQuestion] = useState('');

  // add logic to listen for change of user turn
  socket.on('answer question', (quizInfo) => {
    const name = localStorage.getItem('username');
    setQuestion(quizInfo.question);
    setIsUserTurn(quizInfo.username === name ? true : false);

  })

  return (

    <div className='container p-nav'>
      <div className='container d-flex text-center'>
        <h3>Question is: {question}</h3>
        {isUserTurn ?
          <div>
            {quizInfo.options.map(option => {
              return <button onClick={submitAnswer(option)}>{option}</button>
            })}
          </div> : <h4>Please wait for your turn</h4>}
      </div>
    </div>
  );
};

export default QuizPage;
