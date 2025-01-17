import React from 'react';
import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';

const Hotels = ({ trip }) => {
  return (
    <div className='mb-5'>
      <h2 className='font-bold text-xl mt-5'>List Of Hotels</h2>
      <div className='gap-5 mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {trip?.tripData?.hostelOptions.map((hotel, index) => (
          <div key={index}>
            <HotelCardItem hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
