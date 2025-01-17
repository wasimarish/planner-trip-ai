import { db } from '@/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';



const Index = () => {
  const { tripId } = useParams();
  const [trip,setTrip]=useState();
//   console.log(tripId);
    useEffect(()=>{
        tripId && GetTripData();
    },[tripId]);


    const GetTripData=async ()=>{
    const docRef=doc(db,'AITrips',tripId);
    const docSnap=await getDoc(docRef);

    // console.log('jsjsjs')

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

   }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56 mt-auto'>
      {/* Information Section */}
        <InfoSection trip={trip}/>

      {/* Reccomended Hotels */}
        <Hotels trip={trip}/>
      {/* Daily Plan */}
        <PlacesToVisit trip={trip}/>
      {/* Footer */}
     
    </div>
  );
};

export default Index;
