import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Header = ({ onGenerateTrip }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // console.log(user)
  }, []);

  const LogIn = useGoogleLogin({
    onSuccess: (tokenInfo) => fetchUserProfile(tokenInfo),
    onError: (error) => {
      console.error('Google login failed:', error);
      // Removed toast notifications
    },
  });

  const fetchUserProfile = async (tokenInfo) => {
    if (!tokenInfo?.access_token) {
      console.error('Invalid access token. Please log in again.');
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
        // console.log('User Profile:', response.data);
  
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
      // Removed toast notifications
    }
  };

  return (
    <div className='p-4 shadow-sm flex justify-between items-center px-6'>
      <img src="/logo.svg" alt="Logo" />
      <div>
        {!user ? (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        ) : (
          <div className='flex items-center gap-3'>
           <a href='/my-trips'> <Button className='rounded-full' variant='outline'>My trip</Button></a>
           <a href='/create-trip'> <Button className='rounded-full' variant='outline'>Create Trip</Button></a>
            <Popover>
              <PopoverTrigger>
                <img className='h-[35px] w-[35px] rounded-full' src={user?.picture} alt={user?.name || 'User'} />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>
                  Log Out
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        )}
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
    </div>
  );
};

export default Header;
