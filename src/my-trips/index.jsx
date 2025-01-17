import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/service/FirebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';

const MyTrips = () => {
    const navigate=useNavigation();
const [userTrips,setuserTrips]=useState([]);

    useEffect(()=>{
        GetUserTrips();
    },[])
    const GetUserTrips= async ()=>{
        const user=JSON.parse(localStorage.getItem('user'));
      
        if(!user){
            navigate('./');
            return;
        }
        
        const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);
        setuserTrips([]);
        querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        setuserTrips(prevVal=>[...prevVal,doc.data()])
});

    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'><h2 className='font-bold text-3xl mb-5'>My trips</h2>
 <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
  {userTrips?.length > 0 
    ? userTrips.map((trip, index) => (
        <div key={index}>
          <UserTripCardItem trip={trip} />
        </div>
      )) 
    : [1, 2, 3, 4, 5, 6,7,8,9].map((item, index) => (
        <div className='h-[180px] w-full bg-slate-300 animate-pulse rounded-xl' key={index}></div>
      ))
  }
</div>

  </div>
  )
}

export default MyTrips