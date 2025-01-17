import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/Service/GlobalApi';
import { Link } from 'react-router-dom';

const PlacesToVisit = ({ trip }) => {
  const [photoUrls, setPhotoUrls] = useState({});

  const GetPlacePhoto = async (placeName, day, activityIndex) => {
    const data = { textQuery: placeName };
    const uniqueKey = `${day}-${activityIndex}`;

    try {
      const result = await GetPlaceDetails(data);
      const photoRef = result.data.places[0]?.photos?.[2]?.name; // Safe chaining
      if (photoRef) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
        // console.log("Photo URL:", photoUrl);
        setPhotoUrls(prevState => ({
          ...prevState,
          [uniqueKey]: photoUrl
        }));
      } else {
        console.error(`No photo reference found for ${placeName}`);
      }
    } catch (error) {
      console.error(`Error fetching place details for ${placeName}:`, error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (trip?.tripData?.itinerary) {
      // Clear previous photo URLs when trip changes
      setPhotoUrls({});
      
      // Fetch photos for all activities
      Object.entries(trip.tripData.itinerary).forEach(([day, details]) => {
        details.activities.forEach((activity, index) => {
          GetPlacePhoto(activity.placeName, day, index);
        });
      });
    }
  }, [trip]);

  if (!trip?.tripData?.itinerary) {
    return <p className="text-center text-gray-500 mt-5">No itinerary available.</p>;
  }

  return (
    <div className="p-5">
      <h2 className="font-bold text-2xl mb-5 text-center">
        {trip.tripData.tripName || 'Places To Visit'}
      </h2>
      
      {Object.entries(trip.tripData.itinerary)
        .sort((a, b) => {
          const dayA = parseInt(a[0].replace('day', ''), 10);
          const dayB = parseInt(b[0].replace('day', ''), 10);
          return dayA - dayB;
        })
        .map(([day, details]) => (
          <div key={day} className="mb-8">
            <h2 className="font-medium text-lg text-gray-800 mb-2">
              {`Day ${day.replace('day', '')}: ${details.theme}`}
            </h2>
            <p className="text-sm font-medium text-orange-600 mb-4">
              {`Best time to visit: ${details.bestTimeToVisit || 'N/A'}`}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5">
              {details.activities && details.activities.length > 0 ? (
                details.activities.map((activity, activityIndex) => {
                  const uniqueKey = `${day}-${activityIndex}`;
                  return (
                    <div
                      key={uniqueKey}
                      className="border rounded-xl p-4 shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                      <h4 className="font-medium text-lg text-gray-800 mb-2">
                        {activity.placeName}
                      </h4>
                      <div className="flex justify-between items-start">
                        <div className="flex-1 pr-4">
                          <p className="text-sm font-semibold text-gray-700">
                            {activity.placeDetails}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            {activity.timeToTravel}
                          </p>
                          {activity.ticketPricing && (
                            <p className="text-sm text-blue-600 mt-1">
                              Price: {activity.ticketPricing}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <img
                            className="w-[200px] h-[150px] rounded-md object-cover"
                            src={
                              photoUrls[uniqueKey] || 
                              activity.placeImageUrl ||
                              "/360_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg"
                            }
                            alt={activity.placeName}
                          />
                        </div>
                      </div>
                      
                      {activity.geoCoordinates && (
                        <Link
                          to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.placeName)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 text-sm underline block mt-3"
                        >
                          View on Google Maps
                        </Link>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">No activities available for this day.</p>
              )}
            </div>
          </div>
        ))}
        
      {trip.tripData.notes && (
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Important Notes:</h3>
          <p className="text-sm text-gray-700">{trip.tripData.notes}</p>
        </div>
      )}
    </div>
  );
};

export default PlacesToVisit;
