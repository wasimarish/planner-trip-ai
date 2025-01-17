import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='text-center text-[56px] font-bold mt-4 '>
            <span className='text-[blue]'>Discover your next adventure with AI </span>
            Personalized Itinreraries at your fingertips
        </h1>
        <p className='text-[28px] font-semibold text-center text-[#2d458ed3] mb-2'>Your personal trip planner and travel curator, creating custom itinearies tailores to your interesdt and budget</p>
        <Link to='/create-trip'>
            <Button className='self-center'> Get Startes its free</Button>
        </Link>
        
    </div>
  )
}

export default Hero