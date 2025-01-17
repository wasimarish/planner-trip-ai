import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi.jsx';



const InfoSection = ({ trip }) => {

  const[photoUrl,setPhotoUrl]=useState();

  const GetPlacePhoto = async (trip) => {
    const data = { textQuery: trip.userSelection.location.label };
    console.log(data);

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
    <div className='m-auto'>
      <img src={photoUrl} className='h-[300px] w-full object-cover rounded-xl' />

      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
        <div className='flex gap-5'>
          <h2 className='p1 px-3 bg-gray-200 rounded-full text-white-300 text-md md:text-xs'> 📅 {trip?.userSelection?.noOfDays}</h2>
          <h2 className='p1 px-3 bg-gray-200 rounded-full text-white-300 text-md md:text-xs'>💲{trip?.userSelection?.budget}</h2>
          <h2 className='p1 px-3 bg-gray-200 rounded-full text-white-300 text-md md:text-xs'>No of travelers {trip?.userSelection?.traveller}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
