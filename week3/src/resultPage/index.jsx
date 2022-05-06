import React from "react";
import "./resultPage.css";
import { Link } from "react-router-dom";

function ResultPage({winner}) {
    return ( 
        <div id="ResultPage">
            <header className="resultPageHeader">
                <h1>카페 최강자는?</h1>
            </header>
            <div className="resultPageMain">
                <div className="result-page--wrapper">
                    <img className="crownImg" src="./assets/crown.png" alt="crown"/>
                    <img className="winnerImg" src={winner[0].img}/>
                </div>
                <section className="buttonWrapper">
                <Link className="replayGameLink linkStyle" to={"/"}>
                    <button className="replayButton">처음으로</button>
                    <button className="cancelButton">공유하기</button>
                </Link>
                </section>
            </div>
        </div>
    );
}

export default ResultPage;

