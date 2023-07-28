import React from "react";
import "./playerStatus.css"

export const PlayerStatus = ({player}) => {
    return (
        <div className="player-info-container">
            <div className="player-info" key={player.steamId}>
                <p>Player Name: {player.userName}</p>
                <p>Player Win Rate: {player.percentageOfWins} %</p>
                <p>Player Victory: {player.totalOfWins}</p>
                <p>Player Defeat: {player.totalOfLosses}</p>
            </div>
        </div>
    )
}

export default PlayerStatus;