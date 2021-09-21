import React, { useState, useContext, useEffect } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container'
import { userExitsRoomHandler } from "../../handlers/userRoomInteractionHandlers";
import { GameContext, GameStateTypes } from "../../models/GameStateTypes";
import { socket } from "../../service/socket";

import './style.css'

const QuizPage = () => {

  const game = useContext(GameContext);
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['A', 'B', 'C']);
  // temporary hardcoding of count
  const [count, setCount] = useState(10);

  const startSimulateClock = () => {
    let localCount = count;
    setInterval(() => {
      localCount--;
      console.log(localCount);

      if (localCount > 0) {
        setCount(prev => prev - 1);
      }

      if (localCount < 1) {
        setIsUserTurn(prev => !prev)
        setCount(10);
        localCount = 10;
      }

    }, 1000);
  }

  useEffect(() => {
    startSimulateClock();
  }, [])

  const submitAnswer = () => {
    // stub
    console.log('submitted answer')
    setIsUserTurn(prev => !prev);
  }

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
        <h4>{count} {count === 1 ? 'second' : 'seconds'} remaining...</h4>
        <Container>
          <ProgressBar animated now={count * 10} className='transition-one-second' />
        </Container>
        {isUserTurn ?
          <div>
            {options.map(option => {
              return <button onClick={() => submitAnswer(option)} className='btn btn-primary m-4'>{option}</button>
            })}
          </div> : <div>
            <h4>Please wait for your turn</h4>
            {options.map(option => {
              return <button disabled className='btn btn-disabled mx-4'>{option}</button>
            })}
          </div>
        }
      </div>
    </div >
  );
};

export default QuizPage;
