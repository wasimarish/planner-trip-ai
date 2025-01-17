 export const SelectTravelsList=[
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo adventure to discover yourself.',
        icon: '✈',
        people: '1'
      },
      {
        id: 2,
        title: 'Family Fun',
        desc: 'A fun trip with the whole family.',
        icon: '👨‍👩‍👧‍👦',
        people: '4'
      },
      {
        id: 3,
        title: 'Romantic Escape',
        desc: 'A cozy getaway with your special one.',
        icon: '❤️',
        people: '2'
      },
      {
        id: 4,
        title: 'Adventure Time',
        desc: 'An action-packed trip for thrill-seekers.',
        icon: '🏞️',
        people: '2-3'
      },
      {
        id: 5,
        title: 'Luxury Retreat',
        desc: 'Indulge in a high-end travel experience.',
        icon: '🏰',
        people: '2'
      },
      {
        id: 6,
        title: 'Group Expedition',
        desc: 'Explore together with a big group.',
        icon: '🚌',
        people: '8-10'
      },
      {
        id: 7,
        title: 'Business Trip',
        desc: 'Focus on work while we plan your stay.',
        icon: '💼',
        people: '1-2'
      },
      {
        id: 8,
        title: 'Cultural Journey',
        desc: 'Discover local cultures and traditions.',
        icon: '🏛️',
        people: '1-4'
      },
      {
        id: 9,
        title: 'Weekend Getaway',
        desc: 'Quick escape for the weekend.',
        icon: '🌴',
        people: '2-4'
      },
      {
        id: 10,
        title: 'Backpacking',
        desc: 'Budget-friendly travel for explorers.',
        icon: '🎒',
        people: '1-2'
      }
 ];

 export const SelectBudgetOptions=[
  
        {
          id: '1',
          title: 'Cheap',
          desc: 'Stay conscious of cost.',
          icon: '💵'
        },
        {
          id: '2',
          title: 'Moderate',
          desc: 'Keep cost on the average side.',
          icon: '💵'
        },
        {
          id: '3',
          title: 'Luxurious',
          desc: 'Indulge in premium experiences.',
          icon: '💎'
        },
      ];
      
 export const AI_PROMPT='"Generate Travel Plan for Location : {location} for {totalDays} for {traveller} with {budget} ,Give me a Hostel option list with HotelName ,Hotel Address , Price, Hotel image url , geo coordinates, rating, description and suggest itinerary with Place Name, Place Details, Place image url, Geo coordinates , Ticket pricing, time taken to travel to each location for {totalDays} days with each day plan with best time to visit in JSON Format"'