import React, { useState } from "react";
import trendupIcon from "../images/TrendUp.png";
import trenddownIcon from "../images/TrendDown.png";

function Cards(cards) {
  console.log(cards);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timeFrame, setTimeFrame] = useState(cards.initialTimeFrame);
  const timeFrames = ["last week", "last month", "last year"];
  const trendup = (
    <img className="card__trendup-icon" src={trendupIcon} alt="Trend up" />
  );
  const trenddown = (
    <img
      className="card__trenddown-icon"
      src={trenddownIcon}
      alt="Trend down"
    />
  );

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
        <h2 className="card__title">{cards.title}</h2>
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
        <span className="card__metric">{cards.total}</span>

        <div className="card__metrics-footer">
          <div
            className={`card__percentage-badge ${
              cards.percentage < 0 ? "negative" : "positive"
            }`}
          >
            {cards.percentage < 0 ? trenddown : trendup} {cards.percentage}%
          </div>
          <span className="card__time-frame">from {timeFrame}</span>
        </div>
      </div>
    </div>
  );
}

export default Cards;
