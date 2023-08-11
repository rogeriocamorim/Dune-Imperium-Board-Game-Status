import React, { useState } from 'react';
import './gameDetails.css';
import GameCard from './GameCard';
import PaginationButtons from './PaginationButtons';

const GamesDetails = ({ games }) => {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);

    if (!games || games.length === 0) {
        return <p className="message">No games found</p>;
    }

    const totalPages = Math.ceil(games.length / itemsPerPage);
    const currentGames = games.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const handlePrevPage = () => setCurrentPage((prevPage) => prevPage - 1);

    return (
        <div className="games-container">
            <PaginationButtons
                currentPage={currentPage}
                totalPages={totalPages}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
            />
            <div className="columns">
                {currentGames.map((game) =>
                    <GameCard game={game} />
                )}
            </div>
            <PaginationButtons
                currentPage={currentPage}
                totalPages={totalPages}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
            />
        </div>
    );
};

export default GamesDetails;
