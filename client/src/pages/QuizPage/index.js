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
    let clock = setInterval(() => {
      // use clearInterval(clock) to stop this from somewhere else
      // console.log(game.getState);
      // if (game.getState != GameStateTypes.QUIZ) return;
      localCount--;
      console.log(localCount);

      //if the timer is 0 it should move to the next question
      if(localCount === 0){
        let ans = 'null';
        socket.emit("answer", ans)
      }

      // issue here with count and local value in interval loop
      // maybe clear interval at end, update value and recursively call

      if (localCount > 0) {
        setCount(prev => prev - 1);
      }

      if (localCount < 1) {
        setIsUserTurn(prev => !prev)
        setCount(10);
        localCount = 10;
      }

    }, 1000);
    
    socket.on("quiz ended", (roomId)=>{
      clearInterval(clock)
      clock = 0;
      localCount = 0;
      game.setState(GameStateTypes.QUIZ_FINISHED)
    })
  }

  // should handle component unmount with useEffect cleanup
  useEffect(() => {
    startSimulateClock();
  }, [])

  const submitAnswer = (e) => {
    // stub
    socket.emit("answer", e)
    console.log(e)
    setIsUserTurn(prev => !prev)
    setCount(10);
    
  
    
    // Instead always 10s e.g. 'lock in answer'
    // setIsUserTurn(prev => !prev);
    // setCount(10);
  }

  useEffect(async () => {
  // add logic to listen for change of user turn
  socket.on('answer question', (quizInfo) => {
    const name = localStorage.getItem('username');
    setQuestion(quizInfo.question);
    setIsUserTurn(quizInfo.username === name ? true : false);
  })}, [])

  useEffect(async () => {
  // add socket to update clock
  socket.on('countdown', secondsRemaining => {
    setCount(secondsRemaining);
  })}, [])

  useEffect(async () => {
  socket.on('question', (question)=>{
    setQuestion(question)
  })}, [])

  useEffect(async () => {
  socket.on("options", (options)=>{
    setOptions(options)
  })}, [])



  const exitHandler = () => {
    // stub
     userExitsRoomHandler(game.gameSettings.admin), 
     console.log("user exits handler called")
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
          <div className='row'>
            {options.map(option => {
              return (<div className='col'><button onClick={() => submitAnswer(option)} className='btn btn-primary m-4'>{option}</button></div>)
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
