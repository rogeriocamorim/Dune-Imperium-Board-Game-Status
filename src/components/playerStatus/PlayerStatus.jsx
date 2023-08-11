import React from "react";
import "./playerStatus.css"

export const PlayerStatus = ({player}) => {
    return (
        <div className="player-info-container">
            <div className="player-info" key={player.steamId}>
                <p>Player Name: {player.userName}</p>
                <p>Win Rate: {player.percentageOfWins} % // Victory({player.totalOfWins}) / Defeat({player.totalOfLosses})</p>
            </div>
        </div>
    )
}

export default PlayerStatus;