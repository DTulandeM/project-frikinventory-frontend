import React, { useState, useEffect } from "react";
import trendupIcon from "../images/TrendUp.png";
import trenddownIcon from "../images/TrendDown.png";

function Cards({ card, products, updateStockCards }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timeFrame, setTimeFrame] = useState(
    card.initialTimeFrame || "last week"
  );

  const timeFrames = ["last week", "last month", "last year"];

  useEffect(() => {
    updateStockCards(products, timeFrame);
  }, [products, timeFrame]);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleTimeFrameChange(period) {
    setTimeFrame(period);
    setIsDropdownOpen(false);
  }

  return (
    <div className="card__container">
      <div className="card__header">
        <h2 className="card__title">{card.title}</h2>
        <div className="card__dropdown">
          <button className="card__dropdown-trigger" onClick={toggleDropdown}>
            <span className="card__dots">•••</span>
          </button>
          {isDropdownOpen && (
            <div className="card__dropdown-menu">
              {timeFrames.map((period) => (
                <button
                  key={period}
                  className="card__dropdown-item"
                  onClick={() => handleTimeFrameChange(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card__metrics-container">
        <span className="card__metric">{card.total}</span>

        <div className="card__metrics-footer">
          <div
            className={`card__percentage-badge ${
              card.percentage <= 0 ? "negative" : "positive"
            }`}
          >
            <img
              className={
                card.percentage <= 0
                  ? "card__trenddown-icon"
                  : "card__trendup-icon"
              }
              src={card.percentage <= 0 ? trenddownIcon : trendupIcon}
              alt="Trend icon"
            />
            {card.percentage}%
          </div>
          <span className="card__time-frame">from {timeFrame}</span>
        </div>
      </div>
    </div>
  );
}

export default Cards;
