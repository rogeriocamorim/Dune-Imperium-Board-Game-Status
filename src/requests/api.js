const url = '127.0.0.1:8080'
const fetchPlayerWinRate = async (inputValue) => {
    try {
        const response = await fetch(
            `http://${url}/player-status/player-win-rate?name=${inputValue}`
        );
        if (!response.ok) {
            console.log('Request failed!');
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error('Error with the server fetching player data:', error);
    }
};

const fetchPlayerWinRateByLeader = async (inputValue) => {
    try {
        const response = await fetch(
            `http://${url}/player-status/player-win-rate-by-leader?name=${inputValue}`
        );
        if (!response.ok) {
            console.log('Request failed!');
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error('Error with the server fetching player data:', error);
    }
};

const fetchPlayerGames = async (inputValue) => {
    try {
        const response = await fetch(
            `http://${url}/game/player-games?steamName=${inputValue}`
        );
        if (!response.ok) {
            console.log('Request failed!');
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error('Error with the server fetching player games:', error);
    }
}

const fetchGameDetails = async (id) => {
    try {
        const response = await fetch(`http://${url}/game/details?gameId=${id}`);
        if (!response.ok) {
            console.log("Request failed!");
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching game details:", error);
    }
};

export { fetchPlayerWinRate, fetchPlayerWinRateByLeader, fetchPlayerGames, fetchGameDetails };