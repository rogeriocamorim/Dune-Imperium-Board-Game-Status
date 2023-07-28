import React, {useState} from 'react';
import './gameDetails.css';

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};
const GamesDetails = ({ games }) => {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);

    if (!games || games.length === 0) {
        return <p className="message">No games found</p>;
    }

    // Calculate total number of game and total number of pages
    const totalGameCards = games.length;
    const totalPages = Math.ceil(totalGameCards / itemsPerPage);

    // Calculate the index range to slice the games array for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentGames = games.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    function gameDetails(game) {
        return (
            <div className="game-card" key={game.id}>
                <p>Game date: {formatDate(game.gameStartTimestamp)}</p>
                <table>
                    <thead>
                    <tr>
                        <th>Player</th>
                        <th>Leader</th>
                        <th>Placement</th>
                    </tr>
                    </thead>
                    <tbody>
                    {game.players.map((player) => (
                        <tr key={player.id}>
                            <td>{player.steamName}</td>
                            <td>{player.leader}</td>
                            <td>{player.placement}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }

    function paginationButtons() {
        return (
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={indexOfLastItem >= games.length}>
                    Next
                </button>
                <div className="pagination-info">
                    <p>Page {currentPage} of {totalPages}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="games-container">
            {paginationButtons()}
            <div className="columns">
                {currentGames.map((game) => gameDetails(game))}
            </div>
            {paginationButtons()}
        </div>
    );
};

export default GamesDetails;
