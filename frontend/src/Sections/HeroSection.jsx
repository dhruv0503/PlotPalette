import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import * as Separator from '@radix-ui/react-separator';
import * as Tabs from '@radix-ui/react-tabs';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { MovieCard } from '../components/CustomCard';
import { Card, Text } from '@radix-ui/themes'


function HeroSection() {
  const [UpcomingMovies, setUpcomingMovies] = useState([]);
  const navigate = useNavigate();
  const handleclick = () => {
    navigate('movies/The%20Dark%20Knight')
  }
  const im = "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg%22"
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const UpcomingResponse = await axios.get(`http://localhost:5000/api/movies/type/now_playing`);
        setUpcomingMovies(UpcomingResponse.data.movies.results);
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <section className='relative z-10'>
      <div className=''>
        <img src={im} alt="" className='min-h-[500px] max-h-[800px] justify-center flex z-0' />
      </div>
      <div className='absolute inset-0 bg-gradient-to-br from-transparent to-black mix-blend-multiply'/>
     
      <div className='absolute  bottom-0 left-0  p-4 m-10'>
        <div className=' rounded-lg'>
          <p className='hidden md:block text-white'>
            Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.
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


