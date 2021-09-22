import React from "react";
import { HomeButton, CreateRoomForm } from "../../components";
import "./style.css";

const CreateRoomPage = () => {
  return (
    <div className="container p-nav">
      <HomeButton text={'Cancel'} />
      <div className="w-100 d-flex justify-content-center">
        <CreateRoomForm />
      </div>
    </div>
  );
};

export default CreateRoomPage;
