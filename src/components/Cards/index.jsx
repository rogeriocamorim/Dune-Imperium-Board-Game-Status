import React from 'react';

function CardsComponent({ has_cards, count, cards }) {
    return (
        <>
      <span>
        {has_cards ? `Showing ${count} cards.` : 'No cards found.'}
      </span>

            <ul className="card-list">
                {cards.map((card) => (
                    <li key={card.name} className="card">
                        <div className="card-wrap">
                            <img
                                src={card.image}
                                alt={card.name}
                                title={card.name}
                                loading="lazy"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default CardsComponent;