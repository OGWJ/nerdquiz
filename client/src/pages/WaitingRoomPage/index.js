import React, { useState, useContext, useEffect } from "react";
import { socket } from "../../service/socket";
import { userStartsQuizHandler } from "../../handlers/userRoomInteractionHandlers";
import "./style.css";
import { GameContext, GameStateTypes } from "../../models/GameStateTypes";
import { userExitsRoomHandler } from "../../handlers/userRoomInteractionHandlers";

const getPlayersInRoom = async () => {
  // return await fetch()
  return ["Bob", "Sal", "Phil"];
};

const WaitingRoomPage = () => {
  const game = useContext(GameContext);
  const [players, setPlayers] = useState([{ user: game.gameSettings.admin }]);
  // useEffect(async () => {
  //   // temp
  //   // will be roomId = game.roomId;
  //   const roomId = 0;
  //   // const otherPlayers = await getPlayersInRoom(roomId)
  //   // setPlayers(otherPlayers + localStorage.getItem('username'));
  //   setPlayers(["fred", "phil"])
  // }, [])

  useEffect(async () => {
    // Listen for others entering room to update the state
    socket.on("user entered room", (eventInfo) => {
      console.log("user entered room");
      console.log(eventInfo.users);
      setPlayers(eventInfo.users);
    });
  }, []);

  useEffect(async () => {
    // Listen for other leaving room to update the state
    socket.on("user exited room", (eventInfo) => {
      console.log("user exited room");
      setPlayers((prev) => {
        prev.filter((player) => player.user != eventInfo.user);
      });
      if (players.length < 1) game.setState(GameStateTypes.HOME);
    });

    socket.on("user started quiz", () => {
      game.setState(GameStateTypes.QUIZ);
    });

    socket.on("quiz ended early", () => {
      game.setState(GameStateTypes.HOME);
    });
  }, []);

  // TODO create color generation stuff

  const isUsersRoom = () => {
    game.username == game.gameSettings.admin ? true : false;
  };

  const handleStuff = () => {
    const roomId = game.gameSettings.admin;
    userStartsQuizHandler(roomId);
    // temp below
    game.setState(GameStateTypes.QUIZ);
  };

  const handleExitRoom = () => {
    // emit user exited room, then
    console.log(game.gameSettings.admin);
    userExitsRoomHandler(game.gameSettings.admin, game.username);
    game.setState(GameStateTypes.HOME);
  };

  return (

    <div className='container row vw-100 p-nav d-flex justify-content-center'>
      <div className='container col-sm'>
        <h3 className='pt-4'>{game.gameSettings.admin}'s Room</h3>
        <h5 className=''><small>Category is</small> <em>{game.gameSettings.category}</em></h5>
        <h5 className=''><small>Difficulty is</small> <em>{game.gameSettings.difficulty}</em></h5>
        <div className='container d-flex justify-content-center'>
          <button onClick={handleStuff} className='btn btn-success m-3'>Start Quiz</button>
          <button onClick={handleExitRoom} className='btn btn-danger m-3'>Exit room</button>
        </div>
      </div>
      <div className='col-sm'>
      <ul>
        {players &&
          players.map((player) => {
            return (
              <li
                className="card user-card text-center d-flex flex-column justify-content-center my-3"
                style={{ backgroundColor: "#4e4d83", color: "#ffffff" }}
              >
                {player.user == game.username ? `${player.user} (you)`: player.user}
              </li>
            );
          })}
      </ul>
      </div>
    </div>
  );
};

export default WaitingRoomPage;
