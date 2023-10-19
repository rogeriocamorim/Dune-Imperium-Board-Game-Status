import React from "react";
import "./playerStatus.css"
import { PieChart } from '@mui/x-charts/PieChart';

export const PlayerStatus = ({ player }) => {
    return (
        <div className="player-info-container">
            <div className="player-info" key={player.steamId}>
                <p>Player Name: {player.userName}</p>
                <PieChart className=".player-info"
                    colors={['orange', 'red']} 
                    series={[
                        {
                            data: [
                                { id: 0, value: player.totalOfWins, label: 'Victory', color: 'orange'},
                                { id: 1, value: player.totalOfLosses, label: 'Defeat', color: 'red'},
                            ],
                        },
                    ]}
                    width={400}
                    height={200}
                />
                <p>Win Rate: {player.percentageOfWins} % // Victory({player.totalOfWins}) / Defeat({player.totalOfLosses})</p>
            </div>
        </div>
    )
}

export default PlayerStatus;