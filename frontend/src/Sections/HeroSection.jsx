import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from '@radix-ui/themes'


function HeroSection({ props }) {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate(`movies/${props[1].id}`)
  }
  return (
    <section className='relative z-10'>

      <div className='relative'>
        <img src={`https://image.tmdb.org/t/p/original/${props[1]?.backdrop_path}`} alt="" className=' min-h-[500px] max-h-[500px] w-full justify-center flex z-10' />
        <div>
        </div>
      </div>


      <div className='absolute inset-0 bg-gradient-to-br from-transparent to-black mix-blend-multiply' />

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


