const url = '127.0.0.1:8080'
const fetchPlayerData = async (inputValue) => {
    try {
        const response = await fetch(
            `http://${url}/player-status/player-status?name=${inputValue}`
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
            `http://${url}/game/playerGames?steamName=${inputValue}`
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

export { fetchPlayerData, fetchPlayerGames };