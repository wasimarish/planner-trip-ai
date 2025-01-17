import { GetPlaceDetails, PHOTO_REF_URL } from '@/Service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UserTripCardItem = ({trip}) => {

     const[photoUrl,setPhotoUrl]=useState();
    
      const GetPlacePhoto = async (trip) => {
        const data = { textQuery: trip.userSelection.location.label };
        // console.log(data);
    
        try {
          const result = await GetPlaceDetails(data);
          // console.log("Place Details:", result); // Adjusted to log actual response
          // console.log("Place Details:", result.data.places[0].photos[2].name);
    
          const photoUrl=PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[2].name);
          // console.log(photoUrl);
          setPhotoUrl(photoUrl);
    
        } catch (error) {
          console.error("Error fetching place details:", error);
        }
      };
    
      useEffect(() => {
        if (trip) {
          GetPlacePhoto(trip);
        }
      }, [trip]);

  return (
    <Link to={'/view-trip/'+trip.id}>
    <div className='hover:scale-100 transition-all'>
        <img className='rounded-xl h-[180px] w-full object-cover'src={photoUrl} alt="" />
        <div>
            <h2 className='font-bold text-large'>{trip?.userSelection?.location.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip.userSelection.noOfDays} Days trip with {trip.userSelection.budget}</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem