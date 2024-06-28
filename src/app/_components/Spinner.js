import React from 'react';

function Spinner({ type = "spinner" }) { // Changed `class` to `className`
  return <div className={`${type}`}></div>;
}

export default Spinner;