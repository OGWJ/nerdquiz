import React, { useState, useContext } from "react";
import { socket } from "../../service/socket";
import { userEntersRoomHandler } from "../../handlers/userRoomInteractionHandlers";
import { GameContext, GameStateTypes } from "../../models/GameStateTypes";

import "./style.css";
import { useEffect } from "react";

const HomePage = () => {
  const game = useContext(GameContext);

  // Get all rooms on mount
  const [rooms, setRooms] = useState([]);

  useEffect(async () => {
    socket.emit("get room list");
    let allRoomsOnMount = [
      { admin: "jessica", category: "Board Games", difficulty: "Hard" }
    ]; //await fetch(`${apiUrl}${allRoomsEndPoint}`)
    setRooms(allRoomsOnMount);
  }, []);

  useEffect(async () => {
    // Update rooms when they are created in real-time
    socket.on("room created", (newRoom) => {
      
      setRooms(
        rooms.push({
          admin: newRoom.admin,
          category: newRoom.category,
          difficulty: newRoom.difficulty
        })
      );
    });
  }, []);

  const joinRoom = (room) => {
    userEntersRoomHandler(room.admin)
    console.log("joined room");

    // NOTE: Line below for temporary for development without socket
    game.setState(GameStateTypes.WAITING_ROOM);
    game.setGameSettings(room)
  };
  useEffect(async () => {
    socket.on("room list", (allGames) => {
      setRooms(allGames);
    });
  }, []);
  useEffect(async () => {
    socket.on("user enter room", () => {
      game.setState(GameStateTypes.WAITING_ROOM);
    });
  }, []);

  const handleCreateRoom = () => {
    // stub
    game.setState(GameStateTypes.CREATE_ROOM);
  };

  const getCardColors = (difficulty) => {
    // (OGWJ) TODO: should make difficulties and colors enums for robustness
    switch (difficulty) {
      case "EASY":
        return { bg: "#2fa14b", fg: "#ffffff" };
      case "MEDIUM":
        return { bg: "#1daadd", fg: "#ffffff" };
      case "HARD":
        return { bg: "#4e4d83", fg: "#ffffff" };
    }
  };

  return (
    <div className="container mt-4 p-nav">
      <h3 className="m-4">Welcome {localStorage.getItem("username")}</h3>
      <div className="container d-flex justify-content-center">
        <button className="btn btn-secondary" onClick={handleCreateRoom}>
          Create a Room
        </button>
      </div>
      <ul className="container">
        <h3 className="mt-4">Join a Room</h3>

        {rooms.map((room) => {
          return (
            <li
              className="card text-center my-3 p-3"
              style={{
                backgroundColor: getCardColors("EASY").bg,
                color: getCardColors("EASY").fg
              }}
            >
              <h3>{room.admin}'s Room</h3>
              <span>{room.category}</span>
              <span>{room.difficulty}</span>
              <button onClick={(e) => joinRoom(room)}>
                Join
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;
