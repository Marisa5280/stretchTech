import React from 'react';
import './ParksWrapper.css';
import { ParkCards, ParkProps } from '../ParkCards/ParkCards';

function ParksWrapper({ parks }: { parks: ParkProps[] }) {
  const parkCards = parks.map(park => {
    return (
      <ParkCards
        park={park}
        key={park.id}
      />
    );
  });

  return (
    <div className='parks-container'>
      {parkCards}
    </div>
  );
}

export default ParksWrapper;

