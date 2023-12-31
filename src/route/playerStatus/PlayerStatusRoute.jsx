import React, { useEffect, useState } from "react";
import {fetchPlayerWinRate, fetchPlayerWinRateByLeader, fetchPlayerGames} from "../../requests/api";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./playerStatus.css";
import {PlayerStatus} from "../../components/PlayerStatus/PlayerStatus";
import GamesDetails from "../../components/GameDetails";
import ClipLoader from "react-spinners/ClipLoader";

export const PlayerStatusRoute = () => {
    const [player, setPlayer] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [playerGames, setPlayerGames] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (inputValue) {
            setIsLoading(true);
            setPlayer(null);
            setPlayerGames(null);
            fetchPlayerWinRate(inputValue).then((jsonData) => {
                const fetchedPlayer = jsonData[0];
                setPlayer(fetchedPlayer);
                console.log("fetchedPlayer", fetchedPlayer)
                if (fetchedPlayer) {
                    fetchPlayerGames(fetchedPlayer.userName)
                        .then((gamesData) =>{
                            setPlayerGames(gamesData);
                            setIsLoading(false)
                            console.log("gamesData", gamesData);
                        })
                        .catch((error) => {
                            console.error("Error fetching player games:", error)
                            setIsLoading(false)
                        });
                }else{
                    setIsLoading(false)
                }
            });
        }
    }, [inputValue]);

    return (
        <div className="container">
            <div className="search-wrapper">
                <TextField
                    label="Search Player"
                    variant="outlined"
                    className="search-input"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button variant="contained"
                        color="primary"
                        className="search-button"
                        style={{padding: "15px 16px", backgroundColor: "#ff8906",}}
                        onClick={() => setInputValue(searchValue)}
                        startIcon={<SearchIcon />}
                >
                    Search
                </Button>
            </div>
            {isLoading ? (
                <div className="loading-msg-container">
                    <p>Loading...</p>
                    <div className="loading-icon-container">
                        <ClipLoader color={"#ff8906"} size={50} />
                    </div>
                </div>
            ) : player ? (
                <div>
                    <PlayerStatus player={player} />
                    <GamesDetails games={playerGames} />
                </div>
            ) : inputValue === "" ? (
                <p className="message">Enter a player name</p>
            ) : (
                <p className="message">Player not found</p>
            )}
        </div>
    );
};

export default PlayerStatusRoute;
