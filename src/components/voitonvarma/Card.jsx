import React from "react";

const Card = ({ number }) => {
  return (
    <div className="card">
      <span className="card-number">{number}</span>
    </div>
  );
};

export default Card;
