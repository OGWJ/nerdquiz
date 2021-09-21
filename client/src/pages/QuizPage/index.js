import React, { useState, useContext } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container'
import { userExitsRoomHandler } from "../../handlers/userRoomInteractionHandlers";
import { GameContext, GameStateTypes } from "../../models/GameStateTypes";
import { socket } from "../../service/socket";

import './style.css'

const QuizPage = () => {

  const game = useContext(GameContext);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [question, setQuestion] = useState('');
  const [count, setCount] = useState(null);

  // add logic to listen for change of user turn
  socket.on('answer question', (quizInfo) => {
    const name = localStorage.getItem('username');
    setQuestion(quizInfo.question);
    setIsUserTurn(quizInfo.username === name ? true : false);
  })

  // add socket to update clock
  socket.on('countdown', secondsRemaining => {
    setCount(secondsRemaining);
  })

  const exitHandler = () => {
    // stub
    // call userExitsRoomHandler(), then
    game.setState(GameStateTypes.QUIZ_FINISHED);
  }

  return (

    <div className='container p-nav'>
      <button onClick={exitHandler}>Exit Quiz</button>
      <div className='container d-flex flex-column text-center'>
        <h3>Question is: {question}</h3>
        <h4>secondsRemaining</h4>
        <Container>
          <ProgressBar now={60} />
        </Container>
        {isUserTurn ?
          <div>
            {quizInfo.options.map(option => {
              return <button onClick={submitAnswer(option)}>{option}</button>
            })}
          </div> : <h4>Please wait for your turn</h4>}
      </div>
    </div >
  );
};

export default QuizPage;
