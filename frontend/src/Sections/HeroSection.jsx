import React, { useState, useEffect } from 'react';
import axios from 'axios'
import HomeSlider from '../components/HomeSlider';
import { useNavigate } from 'react-router-dom';
import * as Separator from '@radix-ui/react-separator';
import * as Tabs from '@radix-ui/react-tabs';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { MovieCard } from '../components/CustomCard';
import { Card, Text } from '@radix-ui/themes'


function HeroSection({props}) {
  const [UpcomingMovies, setUpcomingMovies] = useState([]);
  const navigate = useNavigate();
  const handleclick = () => {
    navigate(`movies/${props[1].id}`)
  }
  const im = "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg%22"
  
  console.log(props[1])

  return (
    <section className='relative z-10'>

      <div className='relative'>
        <img src={`https://image.tmdb.org/t/p/original/${props[1]?.backdrop_path}`} alt="" className=' min-h-[500px] max-h-[500px] w-full justify-center flex z-10' />
        <div>
          
          {/* <svg className='z-0' id="wave" style={{ position: 'absolute', bottom: 0, left: 0, transform: 'rotate(0deg)', transition: '0.3s', zIndex: 1 }} viewBox="0 0 1440 290" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(1, 11, 19, 1)" offset="0%"></stop>
              <stop stopColor="rgba(1, 11, 19, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path style={{ transform: 'translate(0, 0px)', opacity: 1 }} fill="url(#sw-gradient-0)" d="M0,116L360,145L720,145L1080,203L1440,58L1800,116L2160,232L2520,145L2880,145L3240,145L3600,145L3960,58L4320,261L4680,58L5040,203L5400,29L5760,203L6120,58L6480,174L6840,58L7200,203L7560,232L7920,261L8280,0L8640,29L8640,290L8280,290L7920,290L7560,290L7200,290L6840,290L6480,290L6120,290L5760,290L5400,290L5040,290L4680,290L4320,290L3960,290L3600,290L3240,290L2880,290L2520,290L2160,290L1800,290L1440,290L1080,290L720,290L360,290L0,290Z"></path>
        </svg> */}
        </div>
        </div>

     



      <div className='absolute inset-0 bg-gradient-to-br from-transparent to-black mix-blend-multiply'/>
     
      <div className='absolute  bottom-0 left-0 z-10 p-4 m-10'>
        <div className=' rounded-lg'>
          <Text size={"8"} className='text-custom-10' >{props[1]?.title}</Text>
          <p className='hidden md:block text-white'>
          {props[1]?.overview}
          </p>
        </div>
        <button onClick={handleclick} className="mt-2 bg-custom-30 border border-custom-50 hover:bg-custom-50 text-white font-bold py-2 px-4 rounded-lg shadow-lg">
          Review Now
        </button>
      </div>
    </section>


 
   

  )
}





export default HeroSection


