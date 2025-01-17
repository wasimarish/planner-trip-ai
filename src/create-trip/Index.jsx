import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/Constants/Option';
import { chatSession } from '@/Service/AIModal';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/Service/FirebaseConfig';
import { useNavigate, useNavigation } from 'react-router-dom';

// import Autocomplete from "react-google-autocomplete";

const CreateTrip = () => {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  // Update form data dynamically
  const handleInputChange = (name, value) => {
    if (name === 'noOfDays' && value > 9) {
      toast('Please enter a valid number of days (max 9).');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch Google user profile after login
  const fetchUserProfile = async (tokenInfo) => {
    if (!tokenInfo?.access_token) {
      toast('Invalid access token. Please log in again.');
      return;
    }
  
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: 'application/json',
          },
        }
      );
  
      if (response?.data) {
        console.log('User Profile:', response.data);
  
        // Save user profile to localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
  
        // Close the dialog and proceed to generate the trip
        setOpenDialog(false);
        onGenerateTrip();
      } else {
        throw new Error('Invalid user profile data.');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
  
      // Display error message
      toast(
        error?.response?.data?.error_description ||
        'Failed to fetch user profile. Please try again.'
      );
    }
  };

  // Google Login
  const LogIn = useGoogleLogin({
    onSuccess: (tokenInfo) => fetchUserProfile(tokenInfo),
    onError: (error) => {
      console.error('Google login failed:', error);
      toast('Google login failed. Please try again.');
    },
  });

  // Generate Trip based on user preferences
  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.traveller || !formData?.noOfDays) {
      toast('Please fill out all details.');
      return;
    }

    try {
      setLoading(true);
      const FINAL_PROMPT = AI_PROMPT.replace('{location}', formData?.location.label)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveller}', formData?.traveller)
        .replace('{budget}', formData?.budget);

      // console.log('Generated Prompt:', FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      // console.log('AI Response:', await result?.response?.text());
      setLoading(false);
      SaveAiTrip(result?.response.text());
    } catch (error) {
      console.error('Error generating trip:', error);
      toast('Failed to generate trip. Please try again.');
    }
  };

  // Save AI Trip Data to Firebase
  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem('user'));
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse (TripData),
      userEmail:user?.email,
      id:docId,
    });
    setLoading(false);
    navigate('/view-trip/'+docId);
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
      <h1 className='font-bold text-3xl'>Tell us your travel preference</h1>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>
      <div className='mt-10 flex flex-col gap-9'>
        <h2 className='text-xl my-3 font-medium'>What is your destination?</h2>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          selectProps={{
            place,
            onChange: (v) => { 
              setPlace(v); handleInputChange('location', v); 
            }
          }}
        />
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>How many days</h2>
        <Input placeholder='3' type='number' onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is your budget</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border rounded-lg hover:shadow cursor-pointer
              ${formData?.budget === item.title && 'shadow-lg border-black'}`}
            >
              <h2 className='text-3xl'>{item.icon}</h2>
              <h2 className='font-bold txt-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelsList.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('traveller', item.people)}
              className={`p-4 border rounded-lg hover:shadow cursor-pointer
              ${formData?.traveller === item.people && 'shadow-lg border-black'}`}
            >
              <h2 className='text-3xl'>{item.icon}</h2>
              <h2 className='font-bold txt-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button onClick={onGenerateTrip}
         disabled={loading}>
          {loading? "loading" : 'Generate Trip'}
          
          </Button>
      </div>

      {/* Google Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg">Sign in with Google</h2>
              <p>Sign in to the app with Google authentication to proceed.</p>
              <Button onClick={LogIn} className="w-full mt-4">
                
                Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
