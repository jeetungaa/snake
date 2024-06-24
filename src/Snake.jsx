import React from 'react';

const Snake = ({ snakeDots }) => {
  return (
    <>
      {snakeDots.map((dot, i) => (
        <div key={i} className="snake-dot" style={{ top: `${dot[1]}%`, left: `${dot[0]}%` }}></div>
      ))}
    </>
  );
};

export default Snake;