import React from 'react';

const Food = ({ dot }) => {
  return (
    <div className="snake-food" style={{ top: `${dot[1]}%`, left: `${dot[0]}%` }}></div>
  );
};

export default Food;