import React from "react";
import "./startPage.css";
import { Link } from "react-router-dom";

function StartPage(){
    return(
        <div id="startPage">
            <header className="header">
                <h1>❤️🧡💛💚💙💜나의 최애 카페 월드컵❤️🧡💛💚💙💜</h1>
            </header>
            <main>
                <img className="startPageImg" src="./assets/공지철.jpg" alt="myhusband"/>
                <Link className="startGameLink linkStyle" to={"/gamePage"}>
                    <button className="startButton">Game Start</button>
                </Link>
            </main>
        </div>
    );
}

export default StartPage;