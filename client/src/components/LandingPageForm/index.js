import React, { useContext } from "react";
import { GameContext, GameStateTypes } from "../../models/GameStateTypes";
import "./style.css";

const LandingPageForm = () => {

    const game = useContext(GameContext);

    const usernameSubmitHandler = (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        localStorage.setItem("username", name);
        game.setState(GameStateTypes.HOME);
    };

    return (
        <form name="landingpage-form" onSubmit={usernameSubmitHandler}>
            <div className='col'>
                <label htmlFor="username-input" style={{ visibility: "hidden" }}>
                    Enter your name
                </label>
                <br />
                <input
                    id="username-input"
                    placeholder="Enter your username"
                    autoFocus
                    required
                    className='mb-2'
                />
            </div>
            <div className='col'>
                <input type="submit" value="lets go!" className='btn btn-success' />
            </div>
        </form>
    )
}

export default LandingPageForm;