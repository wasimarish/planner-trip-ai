import { GetPlaceDetails, PHOTO_REF_URL } from '@/Service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCardItem = ({hotel}) => {

     const[photoUrl,setPhotoUrl]=useState();

     const GetPlacePhoto = async (trip) => {
        const data = { textQuery: hotel?.hotelName};
        // console.log(data);
    
        try {
          const result = await GetPlaceDetails(data);
          // console.log("Place Details:", result.places[0].photos[3].name); // Adjusted to log actual response
          // console.log("Place Details:", result.data.places[0].photos[2].name);
    
          const photoUrl=PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[2].name);
        //   console.log(photoUrl);
          setPhotoUrl(photoUrl);
    
        } catch (error) {
          console.error("Error fetching place details:", error);
        }
      };
    
      useEffect(() => {
        if (hotel) {
          GetPlacePhoto(hotel);
        }
      }, [hotel]);

  return (
    <>
         <Link
          
          to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelAddress+" "+ hotel?.hotelName} target='_blank'
          className='hover:scale-110 transition-all cursor-pointer'
        >
          <div>
            <img src={photoUrl} alt={hotel.hotelName} className='rounded-xl h-[180px] w-full object-cover' />
            <div>
              <h2 className='font-medium'>{hotel?.hotelName}</h2>
              <h2 className='text-xs text-gray-500'> 📍 {hotel?.hotelAddress}</h2>
              <h2 className='text-xs'> 💸 {hotel?.price}</h2>
              <h2 className='text-xs'> ★ {hotel?.rating}</h2>
            </div>
          </div>
        </Link>
    </>
  )
}

export default HotelCardItem